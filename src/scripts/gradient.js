const canvas = document.getElementById('gradient-canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert('WebGL not supported');
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const vertexShaderSource = `
    attribute vec2 aPosition;
    void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

const fragmentShaderSource = `
    precision highp float;
    
    uniform vec2 iResolution;
    uniform float iTime;
    
    void mainImage(out vec4 fragColor, in vec2 fragCoord)
    {
        const int ps = 0;
        
        // Увеличенный масштаб (было 640x480, стало 320x240)
        float x = fragCoord.x / iResolution.x * 320.;
        float y = fragCoord.y / iResolution.y * 240.;
        
        if (ps > 0)
        {
            x = float(int(x / float(ps)) * ps);
            y = float(int(y / float(ps)) * ps);
        }
        
        // Замедленная анимация (iTime / 5.0)
        float slowTime = iTime / 5.0;
        
        float mov0 = x+y+sin(slowTime)*10.+sin(x/50.)*70.+slowTime * 2.;  // Было x/90, стало x/50
        float mov1 = (mov0 / 5. + sin(mov0 / 20.))/ 10. + slowTime * 3.;   // Было /30, стало /20  
        float mov2 = mov1 + sin(mov1)*5. + slowTime * 2.0;
        float cl1 = sin(sin(mov1/4. + slowTime)+mov1);
        float c1 = cl1 +mov2/2.-mov1-mov2+slowTime;
        float c2 = sin(c1+sin(mov0/70.+slowTime)+sin(y/30.+slowTime/50.)+sin((x+y)/120.)*2.);  // Было /57,/200 стало /30,/120
        float c3 = abs(sin(c2+cos((mov1+mov2+c2) / 10.)+cos((mov2) / 10.)+sin(x/50.)));         // Было /80 стало /50
        
        float dc = float(16-ps);
        
        if (ps > 0)
        {
            cl1 = float(int(cl1*dc))/dc;
            c2 = float(int(c2*dc))/dc;
            c3 = float(int(c3*dc))/dc;
        }
        
        vec3 col = vec3(
            cl1 * 0.3 + c2 * 0.1,
            c3 * 0.1 + cl1 * 0.05,
            cl1 * 0.6 + c2 * 0.4 + c3 * 0.3
        );
        
        col = mix(col, vec3(0.15, 0.05, 0.25), 0.4);
        col = pow(col * 1.2, vec3(1.8));
        col = vec3(
            col.r * 0.5,
            col.g * 0.2,
            col.b * 0.9
        );
        
        fragColor = vec4(col, 1.0);
    }
    
    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
`;

// Остальной код без изменений
function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}

const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
}

gl.useProgram(program);

const positions = new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
     1.0,  1.0
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

const resolutionUniformLocation = gl.getUniformLocation(program, 'iResolution');
const timeUniformLocation = gl.getUniformLocation(program, 'iTime');

let startTime = Date.now();

function animate() {
    const currentTime = (Date.now() - startTime) / 1000;
    
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
    gl.uniform1f(timeUniformLocation, currentTime);
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    
    requestAnimationFrame(animate);
}

animate();
