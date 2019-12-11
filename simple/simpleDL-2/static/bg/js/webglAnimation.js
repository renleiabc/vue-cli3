FSS = {
        FRONT: 0,
        BACK: 1,
        DOUBLE: 2,
        SVGNS: "http://www.w3.org/2000/svg"
    }, FSS.Array = "function" == typeof Float32Array ? Float32Array : Array, FSS.Utils = {
        isNumber: function(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        }
    },
    function() {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; e.length > i && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
            var i = (new Date).getTime(),
                r = Math.max(0, 16 - (i - t)),
                s = window.setTimeout(function() {
                    e(i + r)
                }, r);
            return t = i + r, s
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }(), Math.PIM2 = 2 * Math.PI, Math.PID2 = Math.PI / 2, Math.randomInRange = function(t, e) {
        return t + (e - t) * Math.random()
    }, Math.clamp = function(t, e, i) {
        return t = Math.max(t, e), t = Math.min(t, i)
    }, FSS.Vector3 = {
        create: function(t, e, i) {
            var r = new FSS.Array(3);
            return this.set(r, t, e, i), r
        },
        clone: function(t) {
            var e = this.create();
            return this.copy(e, t), e
        },
        set: function(t, e, i, r) {
            return t[0] = e || 0, t[1] = i || 0, t[2] = r || 0, this
        },
        setX: function(t, e) {
            return t[0] = e || 0, this
        },
        setY: function(t, e) {
            return t[1] = e || 0, this
        },
        setZ: function(t, e) {
            return t[2] = e || 0, this
        },
        copy: function(t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], this
        },
        add: function(t, e) {
            return t[0] += e[0], t[1] += e[1], t[2] += e[2], this
        },
        addVectors: function(t, e, i) {
            return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t[2] = e[2] + i[2], this
        },
        addScalar: function(t, e) {
            return t[0] += e, t[1] += e, t[2] += e, this
        },
        subtract: function(t, e) {
            return t[0] -= e[0], t[1] -= e[1], t[2] -= e[2], this
        },
        subtractVectors: function(t, e, i) {
            return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t[2] = e[2] - i[2], this
        },
        subtractScalar: function(t, e) {
            return t[0] -= e, t[1] -= e, t[2] -= e, this
        },
        multiply: function(t, e) {
            return t[0] *= e[0], t[1] *= e[1], t[2] *= e[2], this
        },
        multiplyVectors: function(t, e, i) {
            return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t[2] = e[2] * i[2], this
        },
        multiplyScalar: function(t, e) {
            return t[0] *= e, t[1] *= e, t[2] *= e, this
        },
        divide: function(t, e) {
            return t[0] /= e[0], t[1] /= e[1], t[2] /= e[2], this
        },
        divideVectors: function(t, e, i) {
            return t[0] = e[0] / i[0], t[1] = e[1] / i[1], t[2] = e[2] / i[2], this
        },
        divideScalar: function(t, e) {
            return 0 !== e ? (t[0] /= e, t[1] /= e, t[2] /= e) : (t[0] = 0, t[1] = 0, t[2] = 0), this
        },
        cross: function(t, e) {
            var i = t[0],
                r = t[1],
                s = t[2];
            return t[0] = r * e[2] - s * e[1], t[1] = s * e[0] - i * e[2], t[2] = i * e[1] - r * e[0], this
        },
        crossVectors: function(t, e, i) {
            return t[0] = e[1] * i[2] - e[2] * i[1], t[1] = e[2] * i[0] - e[0] * i[2], t[2] = e[0] * i[1] - e[1] * i[0], this
        },
        min: function(t, e) {
            return e > t[0] && (t[0] = e), e > t[1] && (t[1] = e), e > t[2] && (t[2] = e), this
        },
        max: function(t, e) {
            return t[0] > e && (t[0] = e), t[1] > e && (t[1] = e), t[2] > e && (t[2] = e), this
        },
        clamp: function(t, e, i) {
            return this.min(t, e), this.max(t, i), this
        },
        limit: function(t, e, i) {
            var r = this.length(t);
            return null !== e && e > r ? this.setLength(t, e) : null !== i && r > i && this.setLength(t, i), this
        },
        dot: function(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        },
        normalise: function(t) {
            return this.divideScalar(t, this.length(t))
        },
        negate: function(t) {
            return this.multiplyScalar(t, -1)
        },
        distanceSquared: function(t, e) {
            var i = t[0] - e[0],
                r = t[1] - e[1],
                s = t[2] - e[2];
            return i * i + r * r + s * s
        },
        distance: function(t, e) {
            return Math.sqrt(this.distanceSquared(t, e))
        },
        lengthSquared: function(t) {
            return t[0] * t[0] + t[1] * t[1] + t[2] * t[2]
        },
        length: function(t) {
            return Math.sqrt(this.lengthSquared(t))
        },
        setLength: function(t, e) {
            var i = this.length(t);
            return 0 !== i && e !== i && this.multiplyScalar(t, e / i), this
        }
    }, FSS.Vector4 = {
        create: function(t, e, i) {
            var r = new FSS.Array(4);
            return this.set(r, t, e, i), r
        },
        set: function(t, e, i, r, s) {
            return t[0] = e || 0, t[1] = i || 0, t[2] = r || 0, t[3] = s || 0, this
        },
        setX: function(t, e) {
            return t[0] = e || 0, this
        },
        setY: function(t, e) {
            return t[1] = e || 0, this
        },
        setZ: function(t, e) {
            return t[2] = e || 0, this
        },
        setW: function(t, e) {
            return t[3] = e || 0, this
        },
        add: function(t, e) {
            return t[0] += e[0], t[1] += e[1], t[2] += e[2], t[3] += e[3], this
        },
        multiplyVectors: function(t, e, i) {
            return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t[2] = e[2] * i[2], t[3] = e[3] * i[3], this
        },
        multiplyScalar: function(t, e) {
            return t[0] *= e, t[1] *= e, t[2] *= e, t[3] *= e, this
        },
        min: function(t, e) {
            return e > t[0] && (t[0] = e), e > t[1] && (t[1] = e), e > t[2] && (t[2] = e), e > t[3] && (t[3] = e), this
        },
        max: function(t, e) {
            return t[0] > e && (t[0] = e), t[1] > e && (t[1] = e), t[2] > e && (t[2] = e), t[3] > e && (t[3] = e), this
        },
        clamp: function(t, e, i) {
            return this.min(t, e), this.max(t, i), this
        }
    }, FSS.Color = function(t, e) {
        this.rgba = FSS.Vector4.create(), this.hex = t || "#000000", this.opacity = FSS.Utils.isNumber(e) ? e : 1, this.set(this.hex, this.opacity)
    }, FSS.Color.prototype = {
        set: function(t, e) {
            t = t.replace("#", "");
            var i = t.length / 3;
            return this.rgba[0] = parseInt(t.substring(0 * i, 1 * i), 16) / 255, this.rgba[1] = parseInt(t.substring(1 * i, 2 * i), 16) / 255, this.rgba[2] = parseInt(t.substring(2 * i, 3 * i), 16) / 255, this.rgba[3] = FSS.Utils.isNumber(e) ? e : this.rgba[3], this
        },
        hexify: function(t) {
            var e = Math.ceil(255 * t).toString(16);
            return 1 === e.length && (e = "0" + e), e
        },
        format: function() {
            var t = this.hexify(this.rgba[0]),
                e = this.hexify(this.rgba[1]),
                i = this.hexify(this.rgba[2]);
            return this.hex = "#" + t + e + i, this.hex
        }
    }, FSS.Object = function() {
        this.position = FSS.Vector3.create()
    }, FSS.Object.prototype = {
        setPosition: function(t, e, i) {
            return FSS.Vector3.set(this.position, t, e, i), this
        }
    }, FSS.Light = function(t, e) {
        FSS.Object.call(this), this.ambient = new FSS.Color(t || "#FFFFFF"), this.diffuse = new FSS.Color(e || "#FFFFFF"), this.ray = FSS.Vector3.create()
    }, FSS.Light.prototype = Object.create(FSS.Object.prototype), FSS.Vertex = function(t, e, i) {
        this.position = FSS.Vector3.create(t, e, i)
    }, FSS.Vertex.prototype = {
        setPosition: function(t, e, i) {
            return FSS.Vector3.set(this.position, t, e, i), this
        }
    }, FSS.Triangle = function(t, e, i) {
        this.a = t || new FSS.Vertex, this.b = e || new FSS.Vertex, this.c = i || new FSS.Vertex, this.vertices = [this.a, this.b, this.c], this.u = FSS.Vector3.create(), this.v = FSS.Vector3.create(), this.centroid = FSS.Vector3.create(), this.normal = FSS.Vector3.create(), this.color = new FSS.Color, this.polygon = document.createElementNS(FSS.SVGNS, "polygon"), this.polygon.setAttributeNS(null, "stroke-linejoin", "round"), this.polygon.setAttributeNS(null, "stroke-miterlimit", "1"), this.polygon.setAttributeNS(null, "stroke-width", "1"), this.computeCentroid(), this.computeNormal()
    }, FSS.Triangle.prototype = {
        computeCentroid: function() {
            return this.centroid[0] = this.a.position[0] + this.b.position[0] + this.c.position[0], this.centroid[1] = this.a.position[1] + this.b.position[1] + this.c.position[1], this.centroid[2] = this.a.position[2] + this.b.position[2] + this.c.position[2], FSS.Vector3.divideScalar(this.centroid, 3), this
        },
        computeNormal: function() {
            return FSS.Vector3.subtractVectors(this.u, this.b.position, this.a.position), FSS.Vector3.subtractVectors(this.v, this.c.position, this.a.position), FSS.Vector3.crossVectors(this.normal, this.u, this.v), FSS.Vector3.normalise(this.normal), this
        }
    }, FSS.Geometry = function() {
        this.vertices = [], this.triangles = [], this.dirty = !1
    }, FSS.Geometry.prototype = {
        update: function() {
            if (this.dirty) {
                var t, e;
                for (t = this.triangles.length - 1; t >= 0; t--) e = this.triangles[t], e.computeCentroid(), e.computeNormal();
                this.dirty = !1
            }
            return this
        }
    }, FSS.Plane = function(t, e, i, r) {
        FSS.Geometry.call(this), this.width = t || 100, this.height = e || 100, this.segments = i || 4, this.slices = r || 4, this.segmentWidth = this.width / this.segments, this.sliceHeight = this.height / this.slices;
        var s, n, o, h, a, l, u, c = [],
            S = this.width * -.5,
            f = .5 * this.height;
        for (s = 0; this.segments >= s; s++)
            for (c.push([]), n = 0; this.slices >= n; n++) u = new FSS.Vertex(S + s * this.segmentWidth, f - n * this.sliceHeight), c[s].push(u), this.vertices.push(u);
        for (s = 0; this.segments > s; s++)
            for (n = 0; this.slices > n; n++) o = c[s + 0][n + 0], h = c[s + 0][n + 1], a = c[s + 1][n + 0], l = c[s + 1][n + 1], t0 = new FSS.Triangle(o, h, a), t1 = new FSS.Triangle(a, h, l), this.triangles.push(t0, t1)
    }, FSS.Plane.prototype = Object.create(FSS.Geometry.prototype), FSS.Material = function(t, e) {
        this.ambient = new FSS.Color(t || "#444444"), this.diffuse = new FSS.Color(e || "#FFFFFF"), this.slave = new FSS.Color
    }, FSS.Mesh = function(t, e) {
        FSS.Object.call(this), this.geometry = t || new FSS.Geometry, this.material = e || new FSS.Material, this.side = FSS.FRONT, this.visible = !0
    }, FSS.Mesh.prototype = Object.create(FSS.Object.prototype), FSS.Mesh.prototype.update = function(t, e) {
        var i, r, s, n, o;
        if (this.geometry.update(), e)
            for (i = this.geometry.triangles.length - 1; i >= 0; i--) {
                for (r = this.geometry.triangles[i], FSS.Vector4.set(r.color.rgba), s = t.length - 1; s >= 0; s--) n = t[s], FSS.Vector3.subtractVectors(n.ray, n.position, r.centroid), FSS.Vector3.normalise(n.ray), o = FSS.Vector3.dot(r.normal, n.ray), this.side === FSS.FRONT ? o = Math.max(o, 0) : this.side === FSS.BACK ? o = Math.abs(Math.min(o, 0)) : this.side === FSS.DOUBLE && (o = Math.max(Math.abs(o), 0)), FSS.Vector4.multiplyVectors(this.material.slave.rgba, this.material.ambient.rgba, n.ambient.rgba), FSS.Vector4.add(r.color.rgba, this.material.slave.rgba), FSS.Vector4.multiplyVectors(this.material.slave.rgba, this.material.diffuse.rgba, n.diffuse.rgba), FSS.Vector4.multiplyScalar(this.material.slave.rgba, o), FSS.Vector4.add(r.color.rgba, this.material.slave.rgba);
                FSS.Vector4.clamp(r.color.rgba, 0, 1)
            }
        return this
    }, FSS.Scene = function() {
        this.meshes = [], this.lights = []
    }, FSS.Scene.prototype = {
        add: function(t) {
            return t instanceof FSS.Mesh && !~this.meshes.indexOf(t) ? this.meshes.push(t) : t instanceof FSS.Light && !~this.lights.indexOf(t) && this.lights.push(t), this
        },
        remove: function(t) {
            return t instanceof FSS.Mesh && ~this.meshes.indexOf(t) ? this.meshes.splice(this.meshes.indexOf(t), 1) : t instanceof FSS.Light && ~this.lights.indexOf(t) && this.lights.splice(this.lights.indexOf(t), 1), this
        }
    }, FSS.Renderer = function() {
        this.width = 0, this.height = 0, this.halfWidth = 0, this.halfHeight = 0
    }, FSS.Renderer.prototype = {
        setSize: function(t, e) {
            return this.width !== t || this.height !== e ? (this.width = t, this.height = e, this.halfWidth = .5 * this.width, this.halfHeight = .5 * this.height, this) : void 0
        },
        clear: function() {
            return this
        },
        render: function() {
            return this
        }
    }, FSS.CanvasRenderer = function() {
        FSS.Renderer.call(this), this.element = document.createElement("canvas"), this.element.style.display = "block", this.context = this.element.getContext("2d"), this.setSize(this.element.width, this.element.height)
    }, FSS.CanvasRenderer.prototype = Object.create(FSS.Renderer.prototype), FSS.CanvasRenderer.prototype.setSize = function(t, e) {
        return FSS.Renderer.prototype.setSize.call(this, t, e), this.element.width = t, this.element.height = e, this.context.setTransform(1, 0, 0, -1, this.halfWidth, this.halfHeight), this
    }, FSS.CanvasRenderer.prototype.clear = function() {
        return FSS.Renderer.prototype.clear.call(this), this.context.clearRect(-this.halfWidth, -this.halfHeight, this.width, this.height), this
    }, FSS.CanvasRenderer.prototype.render = function(t) {
        FSS.Renderer.prototype.render.call(this, t);
        var e, i, r, s, n;
        for (this.clear(), this.context.lineJoin = "round", this.context.lineWidth = 1, e = t.meshes.length - 1; e >= 0; e--)
            if (i = t.meshes[e], i.visible)
                for (i.update(t.lights, !0), r = i.geometry.triangles.length - 1; r >= 0; r--) s = i.geometry.triangles[r], n = s.color.format(), this.context.beginPath(), this.context.moveTo(s.a.position[0], s.a.position[1]), this.context.lineTo(s.b.position[0], s.b.position[1]), this.context.lineTo(s.c.position[0], s.c.position[1]), this.context.closePath(), this.context.strokeStyle = n, this.context.fillStyle = n, this.context.stroke(), this.context.fill();
        return this
    }, FSS.WebGLRenderer = function() {
        FSS.Renderer.call(this), this.element = document.createElement("canvas"), this.element.style.display = "block", this.vertices = null, this.lights = null;
        var t = {
            preserveDrawingBuffer: !1,
            premultipliedAlpha: !0,
            antialias: !0,
            stencil: !0,
            alpha: !0
        };
        return this.gl = this.getContext(this.element, t), this.unsupported = !this.gl, this.unsupported ? "WebGL is not supported by your browser." : (this.gl.clearColor(0, 0, 0, 0), this.gl.enable(this.gl.DEPTH_TEST), void this.setSize(this.element.width, this.element.height))
    }, FSS.WebGLRenderer.prototype = Object.create(FSS.Renderer.prototype), FSS.WebGLRenderer.prototype.getContext = function(t, e) {
        var i = !1;
        try {
            if (!(i = t.getContext("experimental-webgl", e))) throw "Error creating WebGL context."
        } catch (r) {
            console.error(r)
        }
        return i
    }, FSS.WebGLRenderer.prototype.setSize = function(t, e) {
        return FSS.Renderer.prototype.setSize.call(this, t, e), this.unsupported ? void 0 : (this.element.width = t, this.element.height = e, this.gl.viewport(0, 0, t, e), this)
    }, FSS.WebGLRenderer.prototype.clear = function() {
        return FSS.Renderer.prototype.clear.call(this), this.unsupported ? void 0 : (this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT), this)
    }, FSS.WebGLRenderer.prototype.render = function(t) {
        if (FSS.Renderer.prototype.render.call(this, t), !this.unsupported) {
            var e, i, r, s, n, o, h, a, l, u, c, S, f, m, g, d = !1,
                p = t.lights.length,
                F = 0;
            if (this.clear(), this.lights !== p) {
                if (this.lights = p, !(this.lights > 0)) return;
                this.buildProgram(p)
            }
            if (this.program) {
                for (e = t.meshes.length - 1; e >= 0; e--) i = t.meshes[e], i.geometry.dirty && (d = !0), i.update(t.lights, !1), F += 3 * i.geometry.triangles.length;
                if (d || this.vertices !== F) {
                    this.vertices = F;
                    for (a in this.program.attributes) {
                        for (u = this.program.attributes[a], u.data = new FSS.Array(F * u.size), f = 0, e = t.meshes.length - 1; e >= 0; e--)
                            for (i = t.meshes[e], r = 0, s = i.geometry.triangles.length; s > r; r++)
                                for (n = i.geometry.triangles[r], m = 0, g = n.vertices.length; g > m; m++) {
                                    switch (vertex = n.vertices[m], a) {
                                        case "side":
                                            this.setBufferData(f, u, i.side);
                                            break;
                                        case "position":
                                            this.setBufferData(f, u, vertex.position);
                                            break;
                                        case "centroid":
                                            this.setBufferData(f, u, n.centroid);
                                            break;
                                        case "normal":
                                            this.setBufferData(f, u, n.normal);
                                            break;
                                        case "ambient":
                                            this.setBufferData(f, u, i.material.ambient.rgba);
                                            break;
                                        case "diffuse":
                                            this.setBufferData(f, u, i.material.diffuse.rgba)
                                    }
                                    f++
                                }
                        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, u.buffer), this.gl.bufferData(this.gl.ARRAY_BUFFER, u.data, this.gl.DYNAMIC_DRAW), this.gl.enableVertexAttribArray(u.location), this.gl.vertexAttribPointer(u.location, u.size, this.gl.FLOAT, !1, 0, 0)
                    }
                }
                for (this.setBufferData(0, this.program.uniforms.resolution, [this.width, this.height, this.width]), o = p - 1; o >= 0; o--) h = t.lights[o], this.setBufferData(o, this.program.uniforms.lightPosition, h.position), this.setBufferData(o, this.program.uniforms.lightAmbient, h.ambient.rgba), this.setBufferData(o, this.program.uniforms.lightDiffuse, h.diffuse.rgba);
                for (l in this.program.uniforms) switch (u = this.program.uniforms[l], S = u.location, c = u.data, u.structure) {
                    case "3f":
                        this.gl.uniform3f(S, c[0], c[1], c[2]);
                        break;
                    case "3fv":
                        this.gl.uniform3fv(S, c);
                        break;
                    case "4fv":
                        this.gl.uniform4fv(S, c)
                }
            }
            return this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices), this
        }
    }, FSS.WebGLRenderer.prototype.setBufferData = function(t, e, i) {
        if (FSS.Utils.isNumber(i)) e.data[t * e.size] = i;
        else
            for (var r = i.length - 1; r >= 0; r--) e.data[t * e.size + r] = i[r]
    }, FSS.WebGLRenderer.prototype.buildProgram = function(t) {
        if (!this.unsupported) {
            var e = FSS.WebGLRenderer.VS(t),
                i = FSS.WebGLRenderer.FS(t),
                r = e + i;
            if (!this.program || this.program.code !== r) {
                var s = this.gl.createProgram(),
                    n = this.buildShader(this.gl.VERTEX_SHADER, e),
                    o = this.buildShader(this.gl.FRAGMENT_SHADER, i);
                if (this.gl.attachShader(s, n), this.gl.attachShader(s, o), this.gl.linkProgram(s), !this.gl.getProgramParameter(s, this.gl.LINK_STATUS)) {
                    var h = this.gl.getError(),
                        a = this.gl.getProgramParameter(s, this.gl.VALIDATE_STATUS);
                    return console.error("Could not initialise shader.\nVALIDATE_STATUS: " + a + "\nERROR: " + h), null
                }
                return this.gl.deleteShader(o), this.gl.deleteShader(n), s.code = r, s.attributes = {
                    side: this.buildBuffer(s, "attribute", "aSide", 1, "f"),
                    position: this.buildBuffer(s, "attribute", "aPosition", 3, "v3"),
                    centroid: this.buildBuffer(s, "attribute", "aCentroid", 3, "v3"),
                    normal: this.buildBuffer(s, "attribute", "aNormal", 3, "v3"),
                    ambient: this.buildBuffer(s, "attribute", "aAmbient", 4, "v4"),
                    diffuse: this.buildBuffer(s, "attribute", "aDiffuse", 4, "v4")
                }, s.uniforms = {
                    resolution: this.buildBuffer(s, "uniform", "uResolution", 3, "3f", 1),
                    lightPosition: this.buildBuffer(s, "uniform", "uLightPosition", 3, "3fv", t),
                    lightAmbient: this.buildBuffer(s, "uniform", "uLightAmbient", 4, "4fv", t),
                    lightDiffuse: this.buildBuffer(s, "uniform", "uLightDiffuse", 4, "4fv", t)
                }, this.program = s, this.gl.useProgram(this.program), s
            }
        }
    }, FSS.WebGLRenderer.prototype.buildShader = function(t, e) {
        if (!this.unsupported) {
            var i = this.gl.createShader(t);
            return this.gl.shaderSource(i, e), this.gl.compileShader(i), this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS) ? i : (console.error(this.gl.getShaderInfoLog(i)), null)
        }
    }, FSS.WebGLRenderer.prototype.buildBuffer = function(t, e, i, r, s, n) {
        var o = {
            buffer: this.gl.createBuffer(),
            size: r,
            structure: s,
            data: null
        };
        switch (e) {
            case "attribute":
                o.location = this.gl.getAttribLocation(t, i);
                break;
            case "uniform":
                o.location = this.gl.getUniformLocation(t, i)
        }
        return n && (o.data = new FSS.Array(n * r)), o
    }, FSS.WebGLRenderer.VS = function(t) {
        var e = ["precision mediump float;", "#define LIGHTS " + t, "attribute float aSide;", "attribute vec3 aPosition;", "attribute vec3 aCentroid;", "attribute vec3 aNormal;", "attribute vec4 aAmbient;", "attribute vec4 aDiffuse;", "uniform vec3 uResolution;", "uniform vec3 uLightPosition[LIGHTS];", "uniform vec4 uLightAmbient[LIGHTS];", "uniform vec4 uLightDiffuse[LIGHTS];", "varying vec4 vColor;", "void main() {", "vColor = vec4(0.0);", "vec3 position = aPosition / uResolution * 2.0;", "for (int i = 0; i < LIGHTS; i++) {", "vec3 lightPosition = uLightPosition[i];", "vec4 lightAmbient = uLightAmbient[i];", "vec4 lightDiffuse = uLightDiffuse[i];", "vec3 ray = normalize(lightPosition - aCentroid);", "float illuminance = dot(aNormal, ray);", "if (aSide == 0.0) {", "illuminance = max(illuminance, 0.0);", "} else if (aSide == 1.0) {", "illuminance = abs(min(illuminance, 0.0));", "} else if (aSide == 2.0) {", "illuminance = max(abs(illuminance), 0.0);", "}", "vColor += aAmbient * lightAmbient;", "vColor += aDiffuse * lightDiffuse * illuminance;", "}", "vColor = clamp(vColor, 0.0, 1.0);", "gl_Position = vec4(position, 1.0);", "}"].join("\n");
        return e
    }, FSS.WebGLRenderer.FS = function() {
        var t = ["precision mediump float;", "varying vec4 vColor;", "void main() {", "gl_FragColor = vColor;", "}"].join("\n");
        return t
    }, FSS.SVGRenderer = function() {
        FSS.Renderer.call(this), this.element = document.createElementNS(FSS.SVGNS, "svg"), this.element.setAttribute("xmlns", FSS.SVGNS), this.element.setAttribute("version", "1.1"), this.element.style.display = "block", this.setSize(300, 150)
    }, FSS.SVGRenderer.prototype = Object.create(FSS.Renderer.prototype), FSS.SVGRenderer.prototype.setSize = function(t, e) {
        return FSS.Renderer.prototype.setSize.call(this, t, e), this.element.setAttribute("width", t), this.element.setAttribute("height", e), this
    }, FSS.SVGRenderer.prototype.clear = function() {
        FSS.Renderer.prototype.clear.call(this);
        for (var t = this.element.childNodes.length - 1; t >= 0; t--) this.element.removeChild(this.element.childNodes[t]);
        return this
    }, FSS.SVGRenderer.prototype.render = function(t) {
        FSS.Renderer.prototype.render.call(this, t);
        var e, i, r, s, n, o;
        for (e = t.meshes.length - 1; e >= 0; e--)
            if (i = t.meshes[e], i.visible)
                for (i.update(t.lights, !0), r = i.geometry.triangles.length - 1; r >= 0; r--) s = i.geometry.triangles[r], s.polygon.parentNode !== this.element && this.element.appendChild(s.polygon), n = this.formatPoint(s.a) + " ", n += this.formatPoint(s.b) + " ", n += this.formatPoint(s.c), o = this.formatStyle(s.color.format()), s.polygon.setAttributeNS(null, "points", n), s.polygon.setAttributeNS(null, "style", o);
        return this
    }, FSS.SVGRenderer.prototype.formatPoint = function(t) {
        return this.halfWidth + t.position[0] + "," + (this.halfHeight - t.position[1])
    }, FSS.SVGRenderer.prototype.formatStyle = function(t) {
        var e = "fill:" + t + ";";
        return e += "stroke:" + t + ";"
    }
function svgAnimate(e, t, n) {
    ! function() {
        function e() {
            t(), i(), r(), o(), l(), a(k.offsetWidth, k.offsetHeight), c()
        }
        function t() {
            b = new FSS.WebGLRenderer, V = new FSS.CanvasRenderer, v = new FSS.SVGRenderer, n(N.renderer)
        }
        function n(e) {
            switch (m && E.removeChild(m.element), e) {
                case w:
                    m = b;
                    break;
                case M:
                    m = V;
                    break;
                case R:
                    m = v
            }
            m.setSize(k.offsetWidth, k.offsetHeight), E.appendChild(m.element)
        }
        function i() {
            h = new FSS.Scene
        }
        function r() {
            h.remove(g), m.clear(), p = new FSS.Plane(x.width * m.width, x.height * m.height, x.segments, x.slices), F = new FSS.Material(x.ambient, x.diffuse), g = new FSS.Mesh(p, F), h.add(g);
            var e, t;
            for (e = p.vertices.length - 1; e >= 0; e--) t = p.vertices[e], t.anchor = FSS.Vector3.clone(t.position), t.step = FSS.Vector3.create(Math.randomInRange(.2, 1), Math.randomInRange(.2, 1), Math.randomInRange(.2, 1)), t.time = Math.randomInRange(0, Math.PIM2)
        }
        function o() {
            var e, t;
            for (e = h.lights.length - 1; e >= 0; e--) t = h.lights[e], h.remove(t);
            for (m.clear(), e = 0; e < y.count; e++) t = new FSS.Light(y.ambient, y.diffuse), t.ambientHex = t.ambient.format(), t.diffuseHex = t.diffuse.format(), h.add(t), t.mass = Math.randomInRange(.5, 1), t.velocity = FSS.Vector3.create(), t.acceleration = FSS.Vector3.create(), t.force = FSS.Vector3.create(), t.ring = document.createElementNS(FSS.SVGNS, "circle"), t.ring.setAttributeNS(null, "stroke", t.ambientHex), t.ring.setAttributeNS(null, "stroke-width", "0.5"), t.ring.setAttributeNS(null, "fill", "none"), t.ring.setAttributeNS(null, "r", "10"), t.core = document.createElementNS(FSS.SVGNS, "circle"), t.core.setAttributeNS(null, "fill", t.diffuseHex), t.core.setAttributeNS(null, "r", "4")
        }
        function a(e, t) {
            m.setSize(e, t), FSS.Vector3.set(A, m.halfWidth, m.halfHeight), r()
        }
        function c() {
            u = Date.now() - H, s(), S(), requestAnimationFrame(c)
        }
        function s() {
            var e, t, n, i, r, o, a, c = x.depth / 2;
            for (FSS.Vector3.copy(y.bounds, A), FSS.Vector3.multiplyScalar(y.bounds, y.xyScalar), FSS.Vector3.setZ(I, y.zOffset), y.autopilot && (e = Math.sin(y.step[0] * u * y.speed), t = Math.cos(y.step[1] * u * y.speed), FSS.Vector3.set(I, y.bounds[0] * e, y.bounds[1] * t, y.zOffset)), i = h.lights.length - 1; i >= 0; i--) {
                r = h.lights[i], FSS.Vector3.setZ(r.position, y.zOffset);
                var s = Math.clamp(FSS.Vector3.distanceSquared(r.position, I), y.minDistance, y.maxDistance),
                    S = y.gravity * r.mass / s;
                FSS.Vector3.subtractVectors(r.force, I, r.position), FSS.Vector3.normalise(r.force), FSS.Vector3.multiplyScalar(r.force, S), FSS.Vector3.set(r.acceleration), FSS.Vector3.add(r.acceleration, r.force), FSS.Vector3.add(r.velocity, r.acceleration), FSS.Vector3.multiplyScalar(r.velocity, y.dampening), FSS.Vector3.limit(r.velocity, y.minLimit, y.maxLimit), FSS.Vector3.add(r.position, r.velocity)
            }
            for (o = p.vertices.length - 1; o >= 0; o--) a = p.vertices[o], e = Math.sin(a.time + a.step[0] * u * x.speed), t = Math.cos(a.time + a.step[1] * u * x.speed), n = Math.sin(a.time + a.step[2] * u * x.speed), FSS.Vector3.set(a.position, x.xRange * p.segmentWidth * e, x.yRange * p.sliceHeight * t, x.zRange * c * n - c), FSS.Vector3.add(a.position, a.anchor);
            p.dirty = !0
        }
        function S() {
            if (m.render(h), y.draw) {
                var e, t, n, i;
                for (e = h.lights.length - 1; e >= 0; e--) switch (i = h.lights[e], t = i.position[0], n = i.position[1], N.renderer) {
                    case M:
                        m.context.lineWidth = .5, m.context.beginPath(), m.context.strokeStyle = i.ambientHex, m.context.stroke(), m.context.beginPath(), m.context.fillStyle = i.diffuseHex, m.context.fill();
                        break;
                    case R:
                        t += m.halfWidth, n = m.halfHeight - n, i.core.setAttributeNS(null, "fill", i.diffuseHex), i.core.setAttributeNS(null, "cx", t), i.core.setAttributeNS(null, "cy", n), m.element.appendChild(i.core), i.ring.setAttributeNS(null, "stroke", i.ambientHex), i.ring.setAttributeNS(null, "cx", t), i.ring.setAttributeNS(null, "cy", n), m.element.appendChild(i.ring)
                }
            }
        }
        function l() {
            window.addEventListener("resize", f), k.addEventListener("mousemove", d), z.addEventListener("mousemove", d)
        }
        function d(e) {
            FSS.Vector3.set(I, e.x, m.height - e.y), FSS.Vector3.subtract(I, A)
        }
        function f(e) {
            a(k.offsetWidth, k.offsetHeight), S()
        }
        var u, m, h, g, p, F, b, V, v, x = {
                width: 1.2,
                height: 1.2,
                depth: 10,
                segments: 16,
                slices: 8,
                xRange: .8,
                yRange: .2,
                zRange: .8,
                ambient: "#090909",
                diffuse: "#2f2f2f",
                speed: 5e-4
            },
            y = {
                count: 12,
                xyScalar: 1,
                zOffset: 40,
                ambient: "#222222",
                diffuse: "#344055",
                speed: 5e-4,
                gravity: 1200,
                dampening: .95,
                minLimit: 10,
                maxLimit: null,
                minDistance: 20,
                maxDistance: 400,
                autopilot: !1,
                draw: !1,
                bounds: FSS.Vector3.create(),
                step: FSS.Vector3.create(Math.randomInRange(.2, 1), Math.randomInRange(.2, 1), Math.randomInRange(.2, 1))
            },
            w = "webgl",
            M = "canvas",
            R = "svg",
            N = {
                renderer: M
            },
            H = Date.now(),
            A = FSS.Vector3.create(),
            I = FSS.Vector3.create(),
            k = document.getElementById("can-bg"),
            z = document.getElementById("bg_add"),
            E = document.getElementById("can-bg-output");
        document.getElementById("ui");
        e()
    }()
}
svgAnimate();