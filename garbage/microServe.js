/*! microServe v0.4.0 */

"use strict";
var microServe = microServe || {};
microServe.elements = microServe.elements || {},
	microServe.labels = microServe.labels || {},
	microServe.nodes = microServe.nodes || {},
	microServe.util = microServe.util || {},
	microServe.modules = microServe.modules || {},
	microServe.parsing = microServe.parsing || {},
	microServe.elements.BaseElement = function() {
	var a = "DEFAULT_LABEL",
		b = function(b) {
			var c, d, e, f, g, h, i, j, k, l, m = [],
				n = [],
				o = !1,
				p = [],
				q = !1,
				r = !0,
				s = microServe.util.languageTools();
			this.attributes = function(a) {
				return arguments.length ? (n = a, this) : n
			}, this.annotations = function(a) {
				return arguments.length ? (g = a, this) : g
			}, this.comment = function(a) {
				return arguments.length ? (i = a, this) : i
			}, this.description = function(a) {
				return arguments.length ? (j = a, this) : j
			}, this.equivalents = function(a) {
				return arguments.length ? (m = a || [], this) : m
			}, this.equivalentBase = function(a) {
				return arguments.length ? (k = a, this) : k
			}, this.focused = function(a) {
				return arguments.length ? (o = a, this) : o
			}, this.id = function(a) {
				return arguments.length ? (c = a, this) : c
			}, this.indications = function(a) {
				return arguments.length ? (p = a, this) : p
			}, this.iri = function(a) {
				return arguments.length ? (f = a, this) : f
			}, this.label = function(b) {
				return arguments.length ? (d = b || a, this) : d
			}, this.mouseEntered = function(a) {
				return arguments.length ? (q = a, this) : q
			}, this.styleClass = function(a) {
				return arguments.length ? (l = a, this) : l
			}, this.type = function(a) {
				return arguments.length ? (e = a, this) : e
			}, this.visible = function(a) {
				return arguments.length ? (r = a, this) : r
			}, this.visualAttribute = function(a) {
				return arguments.length ? (h = a, this) : h
			}, this.commentForCurrentLanguage = function() {
				return s.textForCurrentLanguage(this.comment(), b.getLanguage())
			}, this.descriptionForCurrentLanguage = function() {
				return s.textForCurrentLanguage(this.description(), b.getLanguage())
			}, this.defaultLabel = function() {
				return s.textForCurrentLanguage(this.label(), "default")
			}, this.indicationString = function() {
				return this.indications().join(", ")
			}, this.labelForCurrentLanguage = function() {
				return s.textForCurrentLanguage(this.label(), b.getLanguage())
			}
		};
	return b.prototype.constructor = b, b
}(), microServe.labels.BaseLabel = function() {
	var a = 28,
		b = 80,
		c = function(a) {
			function b() {
				t.mouseEntered() || (t.mouseEntered(!0), c(!0), t.foreground(), e())
			}

			function c(a) {
				t.labelElement().select("rect").classed("hovered", a), t.linkGroup().selectAll("path, text").classed("hovered", a), t.markerElement().select("path").classed("hovered", a), t.cardinalityElement() && t.cardinalityElement().classed("hovered", a);
				var b = d();
				b.forEach(function(b) {
					b.labelElement().select("rect").classed("indirectHighlighting", a)
				})
			}

			function d() {
				var a = [];
				return t.subproperties() && (a = a.concat(t.subproperties())), t.superproperties() && (a = a.concat(t.superproperties())), a
			}

			function e() {
				var a = d();
				a.forEach(function(a) {
					a.foreground()
				})
			}

			function f() {
				t.mouseEntered(!1), c(!1)
			}
			microServe.elements.BaseElement.apply(this, arguments);
			var g, h, i, j, k, l, m, n, o, p, q, r, s, t = this,
				u = "normal",
				v = "normal",
				w = !0,
				x = [];
			this.cardinality = function(a) {
				return arguments.length ? (g = a, this) : g
			}, this.cardinalityElement = function(a) {
				return arguments.length ? (p = a, this) : p
			}, this.domain = function(a) {
				return arguments.length ? (h = a, this) : h
			}, this.inverse = function(a) {
				return arguments.length ? (i = a, this) : i
			}, this.labelElement = function(a) {
				return arguments.length ? (q = a, this) : q
			}, this.labelVisible = function(a) {
				return arguments.length ? (w = a, this) : w
			}, this.link = function(a) {
				return arguments.length ? (j = a, this) : j
			}, this.linkGroup = function(a) {
				return arguments.length ? (r = a, this) : r
			}, this.linkType = function(a) {
				return arguments.length ? (u = a, this) : u
			}, this.markerElement = function(a) {
				return arguments.length ? (s = a, this) : s
			}, this.markerType = function(a) {
				return arguments.length ? (v = a, this) : v
			}, this.maxCardinality = function(a) {
				return arguments.length ? (l = a, this) : l
			}, this.minCardinality = function(a) {
				return arguments.length ? (k = a, this) : k
			}, this.range = function(a) {
				return arguments.length ? (m = a, this) : m
			}, this.redundantProperties = function(a) {
				return arguments.length ? (x = a, this) : x
			}, this.subproperties = function(a) {
				return arguments.length ? (n = a, this) : n
			}, this.superproperties = function(a) {
				return arguments.length ? (o = a, this) : o
			}, this.isSpecialLink = function() {
				return "special" === u
			}, this.markerId = function() {
				return "marker" + t.id()
			}, this.toggleFocus = function() {
				t.focused(!t.focused()), q.select("rect").classed("focused", t.focused())
			}, this.drawProperty = function(a) {
				function b(b) {
					var c = a.append("g").datum(b).classed("label", !0).attr("id", b.id());
					b.addRect(c);
					var d = microServe.util.textElement(c);
					return b instanceof microServe.labels.owldisjointwith ? (b.addDisjointLabel(a, d), c) : (d.addText(b.labelForCurrentLanguage()), d.addSubText(b.indicationString()), b.addEquivalentsToLabel(d), c)
				}
				if (!t.labelVisible()) return void 0;
				if (t.labelElement(b(t)), t.inverse()) {
					var c = t.labelHeight() / 2 + 1;
					t.inverse().labelElement(b(t.inverse())), t.labelElement().attr("transform", "translate(0,-" + c + ")"), t.inverse().labelElement().attr("transform", "translate(0," + c + ")")
				}
				return t.labelElement()
			}, this.addRect = function(a) {
				var c = a.append("rect").classed(t.styleClass(), !0).classed("property", !0).attr("x", -t.labelWidth() / 2).attr("y", -t.labelHeight() / 2).attr("width", t.labelWidth()).attr("height", t.labelHeight()).on("mouseover", function() {
					b()
				}).on("mouseout", function() {
					f()
				});
				c.append("title").text(t.labelForCurrentLanguage()), t.visualAttribute() && c.classed(t.visualAttribute(), !0)
			}, this.addDisjointLabel = function(b, c) {
				b.append("circle").classed("symbol", !0).classed("fineline", !0).classed("embedded", !0).attr("cx", -12.5).attr("r", 10), b.append("circle").classed("symbol", !0).classed("fineline", !0).classed("embedded", !0).attr("cx", 12.5).attr("r", 10), a.options().compactNotation() || c.addSubText("disjoint"), c.setTranslation(0, 20)
			}, this.addEquivalentsToLabel = function(a) {
				if (t.equivalents()) {
					var b, c;
					b = t.equivalents().map(function(a) {
						return a.labelForCurrentLanguage()
					}), c = b.join(", "), a.addEquivalents(c)
				}
			}, this.drawCardinality = function(a) {
				if (void 0 === t.minCardinality() && void 0 === t.maxCardinality() && void 0 === t.cardinality()) return void 0;
				t.cardinalityElement(a.classed("cardinality", !0));
				var b = a.append("text").classed("cardinality", !0).attr("text-anchor", "middle").attr("dy", "0.5ex");
				if (void 0 !== t.minCardinality()) {
					var c = t.minCardinality().toString();
					c = c.concat(" .. "), c = c.concat(void 0 !== t.maxCardinality() ? t.maxCardinality() : "*"), b.text(c)
				} else void 0 !== t.cardinality() && b.text(t.cardinality());
				return t.cardinalityElement()
			}, this.foreground = function() {
				var a = t.labelElement().node().parentNode,
					b = a.parentNode,
					c = t.linkGroup().node(),
					d = t.linkGroup().node().parentNode;
				b.appendChild(a), d.appendChild(c)
			}
		};
	return c.prototype = Object.create(microServe.elements.BaseElement.prototype), c.prototype.constructor = c, c.prototype.labelHeight = function() {
		return a
	}, c.prototype.labelWidth = function() {
		return b
	}, c.prototype.textWidth = c.prototype.labelWidth, c
}(), microServe.labels.owldatatypeproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.attributes(["datatype"]).styleClass("datatypeproperty").type("owl:DatatypeProperty")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.owldeprecatedproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.attributes(["deprecated"]).styleClass("deprecatedproperty").type("owl:DeprecatedProperty")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.owldisjointwith = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments);
		var b = "Disjoint With";
		this.label = function(a) {
			return arguments.length ? this : b
		}, this.markerType("special").linkType("special").styleClass("disjointwith").type("owl:disjointWith")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.owlequivalentproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.styleClass("equivalentproperty").type("owl:equivalentProperty")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.owlfunctionalproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.attributes(["functional"]).styleClass("functionalproperty").type("owl:FunctionalProperty")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.owlinversefunctionalproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.attributes(["inverse functional"]).styleClass("inversefunctionalproperty").type("owl:InverseFunctionalProperty")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.owlobjectproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.attributes(["object"]).styleClass("objectproperty").type("owl:ObjectProperty")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.owlsymmetricproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.attributes(["symmetric"]).styleClass("symmetricproperty").type("owl:SymmetricProperty")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.owltransitiveproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.attributes(["transitive"]).styleClass("transitiveproperty").type("owl:TransitiveProperty")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.rdfproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.attributes(["rdf"]).styleClass("rdfproperty").type("rdf:Property")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.rdfssubclassof = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments);
		var b = this,
			c = b.drawProperty,
			d = "Subclass of";
		this.drawProperty = function(d) {
			return b.labelVisible(!a.options().compactNotation()), c(d)
		}, this.label = function(a) {
			return arguments.length ? this : d
		}, this.linkType("dotted").markerType("dotted").styleClass("subclass").type("rdfs:subClassOf")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.labels.setoperatorproperty = function() {
	var a = function(a) {
		microServe.labels.BaseLabel.apply(this, arguments), this.markerType("special").labelVisible(!1).linkType("special").styleClass("setoperatorproperty").type("setOperatorProperty")
	};
	return a.prototype = Object.create(microServe.labels.BaseLabel.prototype), a.prototype.constructor = a, a
}(), microServe.elements.link = function() {
	var a, b, c, d, e, f, g, h, i, j, k, l = {};
	return l.curvePoint = function(b) {
		return arguments.length ? (a = b, l) : a
	}, l.domain = function(a) {
		return arguments.length ? (b = a, this.source = a, l) : b
	}, l.inverse = function(a) {
		return arguments.length ? (c = a, l) : c
	}, l.layers = function(a) {
		return arguments.length ? (d = a, l) : d
	}, l.layerCount = function(a) {
		return arguments.length ? (e = a, l) : e
	}, l.layerIndex = function(a) {
		return arguments.length ? (f = a, l) : f
	}, l.loops = function(a) {
		return arguments.length ? (g = a, l) : g
	}, l.loopCount = function(a) {
		return arguments.length ? (h = a, l) : h
	}, l.loopIndex = function(a) {
		return arguments.length ? (i = a, l) : i
	}, l.property = function(a) {
		return arguments.length ? (j = a, l) : j
	}, l.range = function(a) {
		return arguments.length ? (k = a, this.target = a, l) : k
	}, Object.defineProperties(l, {
		source: {
			writable: !0
		},
		target: {
			writable: !0
		}
	}), l.drawLink = function(a, d) {
		j.linkGroup(a), c && c.linkGroup(a), j.markerElement(d.append("marker").datum(j).attr("id", j.markerId()).attr("viewBox", "0 -8 14 16").attr("refX", 12).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").attr("class", j.markerType() + "Marker")), j.markerElement().append("path").attr("d", "M0,-8L12,0L0,8Z"), c && (c.markerElement(d.append("marker").datum(c).attr("id", c.markerId()).attr("viewBox", "0 -8 14 16").attr("refX", 0).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").attr("class", c.markerType() + "Marker")), c.markerElement().append("path").attr("d", "M12,-8L0,0L12,8Z")), a.append("path").classed("link-path", !0).classed(b.cssClassOfNode(), !0).classed(k.cssClassOfNode(), !0).classed(j.linkType(), !0).attr("marker-end", function(a) {
			return a.property().isSpecialLink() ? "" : "url(#" + a.property().markerId() + ")"
		}).attr("marker-start", function(a) {
			return a.inverse() && !a.inverse().isSpecialLink() ? "url(#" + a.inverse().markerId() + ")" : ""
		})
	}, l
}, microServe.nodes.BaseNode = function() {
	var a = function(a) {
		function b() {
			l.fixed = l.locked() || l.frozen() || l.pinned() ? !0 : !1
		}

		function c() {
			if (!l.mouseEntered()) {
				var a = l.nodeElement().node(),
					b = a.parentNode;
				b.appendChild(a), l.setHoverHighlighting(!0), l.mouseEntered(!0)
			}
		}

		function d() {
			l.setHoverHighlighting(!1), l.mouseEntered(!1)
		}
		microServe.elements.BaseElement.apply(this, arguments);
		var e, f, g, h, i, j, k, l = this,
			m = [],
			n = !1,
			o = !1,
			p = !1;
		this.complement = function(a) {
			return arguments.length ? (e = a, this) : e
		}, this.disjointWith = function(a) {
			return arguments.length ? (f = a, this) : f
		}, this.individuals = function(a) {
			return arguments.length ? (m = a || [], this) : m
		}, this.intersection = function(a) {
			return arguments.length ? (g = a, this) : g
		}, this.links = function(a) {
			return arguments.length ? (h = a, this) : h
		}, this.maxIndividualCount = function(a) {
			return arguments.length ? (j = a, this) : j
		}, this.nodeElement = function(a) {
			return arguments.length ? (k = a, this) : k
		}, this.union = function(a) {
			return arguments.length ? (i = a, this) : i
		}, this.locked = function(a) {
			return arguments.length ? (n = a, b(), this) : n
		}, this.frozen = function(a) {
			return arguments.length ? (o = a, b(), this) : o
		}, this.pinned = function(a) {
			return arguments.length ? (p = a, b(), this) : p
		}, l.collectCssClasses = function() {
			var a = [];
			return "string" == typeof l.styleClass() && a.push(l.styleClass()), "string" == typeof l.visualAttribute() && a.push(l.visualAttribute()), a
		}, this.addMouseListeners = function() {
			return l.nodeElement() ? void l.nodeElement().selectAll("*").on("mouseover", c).on("mouseout", d) : void console.warn(this)
		}, this.cssClassOfNode = function() {
			return "node" + l.id()
		}
	};
	return a.prototype = Object.create(microServe.elements.BaseElement.prototype), a.prototype.constructor = a, Object.defineProperties(a, {
		index: {
			writable: !0
		},
		x: {
			writable: !0
		},
		y: {
			writable: !0
		},
		px: {
			writable: !0
		},
		py: {
			writable: !0
		},
		fixed: {
			writable: !0
		},
		weight: {
			writable: !0
		}
	}), a
}(), microServe.nodes.RectangularNode = function() {
	var a = function(a) {
		microServe.nodes.BaseNode.apply(this, arguments);
		var b = this,
			c = 20,
			d = 60;
		this.height = function(a) {
			return arguments.length ? (c = a, this) : c
		}, this.width = function(a) {
			return arguments.length ? (d = a, this) : d
		}, this.actualRadius = function() {
			return d
		}, this.setHoverHighlighting = function(a) {
			b.nodeElement().selectAll("rect").classed("hovered", a)
		}, this.textWidth = function() {
			return this.width()
		}, this.toggleFocus = function() {
			b.focused(!b.focused()), b.nodeElement().select("rect").classed("focused", b.focused())
		}, this.drawNode = function(a, c) {
			var d, e = microServe.nodes.drawTools(),
				f = b.collectCssClasses();
			b.nodeElement(a), c instanceof Array && (f = f.concat(c)), e.appendRectangularClass(a, b.width(), b.height(), f, b.labelForCurrentLanguage()), d = microServe.util.textElement(a), d.addText(b.labelForCurrentLanguage()), b.addMouseListeners()
		}
	};
	return a.prototype = Object.create(microServe.nodes.BaseNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.RoundNode = function() {
	var a = function(a) {
		microServe.nodes.BaseNode.apply(this, arguments);
		var b, c, d, e = this,
			f = !1,
			g = 50;
		this.collapsible = function(a) {
			return arguments.length ? (f = a, this) : f
		}, this.textBlock = function(a) {
			return arguments.length ? (d = a, this) : d
		}, this.radius = function(a) {
			return arguments.length ? (g = a, this) : g
		}, this.setHoverHighlighting = function(a) {
			e.nodeElement().selectAll("circle").classed("hovered", a)
		}, this.textWidth = function() {
			return 2 * this.actualRadius()
		}, this.toggleFocus = function() {
			e.focused(!e.focused()), e.nodeElement().select("circle").classed("focused", e.focused())
		}, this.actualRadius = function() {
			if (!a.options().scaleNodesByIndividuals() || e.individuals().length <= 0) return e.radius();
			var b = 8,
				c = Math.log(e.individuals().length + 1) * b + 5;
			return e.radius() + c
		}, this.drawPin = function() {
			e.pinned(!0), c = e.nodeElement().append("g").classed("hidden-in-export", !0).attr("transform", function() {
				var a = .4 * e.actualRadius(),
					b = -0.7 * e.actualRadius();
				return "translate(" + a + "," + b + ")"
			}), c.append("circle").classed("class pin feature", !0).attr("r", 12).on("click", function() {
				e.removePin(), d3.event.stopPropagation()
			}), c.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 12).attr("y2", 16)
		}, this.removePin = function() {
			e.pinned(!1), c && c.remove(), a.updateStyle()
		}, this.drawCollapsingButton = function() {
			b = e.nodeElement().append("g").classed("hidden-in-export", !0).attr("transform", function() {
				var a = -0.4 * e.actualRadius(),
					b = .5 * e.actualRadius();
				return "translate(" + a + "," + b + ")"
			}), b.append("rect").classed("class pin feature", !0).attr("x", 0).attr("y", 0).attr("width", 40).attr("height", 24), b.append("line").attr("x1", 13).attr("y1", 12).attr("x2", 27).attr("y2", 12), b.append("line").attr("x1", 20).attr("y1", 6).attr("x2", 20).attr("y2", 18)
		}, this.drawNode = function(a, b) {
			var c = microServe.nodes.drawTools(),
				d = e.collectCssClasses();
			e.nodeElement(a), b instanceof Array && (d = d.concat(b)), c.appendCircularClass(a, e.actualRadius(), d, e.labelForCurrentLanguage()), e.postDrawActions(a)
		}, this.postDrawActions = function() {
			var b = microServe.util.textElement(e.nodeElement());
			b.addText(e.labelForCurrentLanguage()), a.options().compactNotation() || b.addSubText(e.indicationString()), b.addInstanceCount(e.individuals().length), e.textBlock(b), e.addMouseListeners(), e.pinned() && e.drawPin(), e.collapsible() && e.drawCollapsingButton()
		}
	};
	return a.prototype = Object.create(microServe.nodes.BaseNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.SetOperatorNode = function() {
	var a = 40,
		b = function(b) {
			microServe.nodes.RoundNode.apply(this, arguments);
			var c = this,
				d = this.setHoverHighlighting,
				e = this.postDrawActions;
			this.radius(a), this.setHoverHighlighting = function(a) {
				d(a), d3.selectAll(".special." + c.cssClassOfNode()).classed("hovered", a)
			}, this.postDrawActions = function() {
				e(), c.textBlock().clear(), c.textBlock().addInstanceCount(c.individuals().length), c.textBlock().setTranslation(0, c.radius() - 15)
			}
		};
	return b.prototype = Object.create(microServe.nodes.RoundNode.prototype), b.prototype.constructor = b, b
}(), microServe.nodes.drawTools = function() {
	function a(a, b) {
		b instanceof Array && b.forEach(function(b) {
			a.classed(b, !0)
		})
	}

	function b(a, b) {
		b && a.append("title").text(b)
	}
	var c = {};
	return c.appendCircularClass = function(c, d, e, f) {
			var g = c.append("circle").classed("class", !0).attr("r", d);
			return a(g, e), b(g, f), g
		}, c.appendRectangularClass = function(c, d, e, f, g) {
			var h = c.append("rect").classed("class", !0).attr("x", -d / 2).attr("y", -e / 2).attr("width", d).attr("height", e);
			return a(h, f), b(h, g), h
		},
		function() {
			return c
		}
}(), microServe.nodes.externalclass = function() {
	var a = function(a) {
		microServe.nodes.RoundNode.apply(this, arguments), this.attributes(["external"]).type("ExternalClass")
	};
	return a.prototype = Object.create(microServe.nodes.RoundNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.owlclass = function() {
	var a = function(a) {
		microServe.nodes.RoundNode.apply(this, arguments), this.type("owl:Class")
	};
	return a.prototype = Object.create(microServe.nodes.RoundNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.owldeprecatedclass = function() {
	var a = function(a) {
		microServe.nodes.RoundNode.apply(this, arguments), this.attributes(["deprecated"]).type("owl:DeprecatedClass")
	};
	return a.prototype = Object.create(microServe.nodes.RoundNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.owlthing = function() {
	var a = function(a) {
		microServe.nodes.RoundNode.apply(this, arguments);
		var b = this.drawNode;
		this.label("Thing").radius(30).styleClass("thing").type("owl:Thing").iri("http://www.w3.org/2002/07/owl#Thing"), this.drawNode = function(a) {
			b(a, ["white", "special"])
		}
	};
	return a.prototype = Object.create(microServe.nodes.RoundNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.owlcomplementof = function() {
	var a = function(a) {
		microServe.nodes.SetOperatorNode.apply(this, arguments);
		var b = this;
		this.styleClass("intersectionof").type("owl:intersectionOf"), this.drawNode = function(a) {
			b.nodeElement(a), a.append("circle").attr("class", b.type()).classed("class", !0).classed("special", !0).attr("r", b.actualRadius());
			var c = a.append("g").classed("embedded", !0);
			c.append("circle").attr("class", "symbol").classed("fineline", !0).attr("r", b.radius() - 15), c.append("path").attr("class", "nofill").attr("d", "m -7,-1.5 12,0 0,6"), c.attr("transform", "translate(-" + (b.radius() - 15) / 100 + ",-" + (b.radius() - 15) / 100 + ")"), b.postDrawActions()
		}
	};
	return a.prototype = Object.create(microServe.nodes.SetOperatorNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.owlequivalentclass = function() {
	var a = function(a) {
		function b(a, b) {
			if ("undefined" != typeof b) {
				var c, d;
				c = b.map(function(a) {
					return a.labelForCurrentLanguage()
				}), d = c.join(", "), a.addEquivalents(d)
			}
		}
		microServe.nodes.RoundNode.apply(this, arguments);
		var c = 4,
			d = this,
			e = d.actualRadius;
		this.styleClass("equivalentclass").type("owl:equivalentClass"), this.actualRadius = function() {
			return e() - c
		}, this.drawNode = function(a) {
			var e = microServe.nodes.drawTools(),
				f = d.collectCssClasses();
			d.nodeElement(a), e.appendCircularClass(a, d.actualRadius() + c, ["white", "embedded"]), e.appendCircularClass(a, d.actualRadius(), f, d.labelForCurrentLanguage()), d.postDrawActions(), b(d.textBlock(), d.equivalents())
		}, d.setHoverHighlighting = function(a) {
			d.nodeElement().selectAll("circle:last-of-type").classed("hovered", a)
		}
	};
	return a.prototype = Object.create(microServe.nodes.RoundNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.owlintersectionof = function() {
	var a = function(a) {
		microServe.nodes.SetOperatorNode.apply(this, arguments);
		var b = this;
		this.styleClass("intersectionof").type("owl:intersectionOf"), this.drawNode = function(a) {
			b.nodeElement(a), a.append("circle").attr("class", b.type()).classed("class", !0).classed("special", !0).attr("r", b.actualRadius());
			var c = a.append("g").classed("embedded", !0);
			c.append("path").attr("class", "nostroke").classed("symbol", !0).attr("d", "m 24.777,0.771 c0,16.387-13.607,23.435-19.191,23.832S-15.467,14.526-15.467,0.424S-1.216-24.4,5.437-24.4 C12.09-24.4,24.777-15.616,24.777,0.771z"), c.append("circle").attr("class", "nofill").classed("fineline", !0).attr("r", b.radius() - 15), c.append("circle").attr("cx", 10).attr("class", "nofill").classed("fineline", !0).attr("r", b.radius() - 15), c.append("path").attr("class", "nofill").attr("d", "m 9,5 c 0,-2 0,-4 0,-6 0,0 0,0 0,0 0,0 0,-1.8 -1,-2.3 -0.7,-0.6 -1.7,-0.8 -2.9,-0.8 -1.2,0 -2,0 -3,0.8 -0.7,0.5 -1,1.4 -1,2.3 0,2 0,4 0,6"), c.attr("transform", "translate(-" + (b.radius() - 15) / 5 + ",-" + (b.radius() - 15) / 100 + ")"), b.postDrawActions()
		}
	};
	return a.prototype = Object.create(microServe.nodes.SetOperatorNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.owlunionof = function() {
	var a = function(a) {
		microServe.nodes.SetOperatorNode.apply(this, arguments);
		var b = this;
		this.styleClass("unionof").type("owl:unionOf"), this.drawNode = function(a) {
			b.nodeElement(a), a.append("circle").attr("class", b.type()).classed("class", !0).classed("special", !0).attr("r", b.actualRadius());
			var c = a.append("g").classed("embedded", !0);
			c.append("circle").attr("class", "symbol").attr("r", b.radius() - 15), c.append("circle").attr("cx", 10).attr("class", "symbol").classed("fineline", !0).attr("r", b.radius() - 15), c.append("circle").attr("class", "nofill").classed("fineline", !0).attr("r", b.radius() - 15), c.append("path").attr("class", "link").attr("d", "m 1,-3 c 0,2 0,4 0,6 0,0 0,0 0,0 0,2 2,3 4,3 2,0 4,-1 4,-3 0,-2 0,-4 0,-6"), c.attr("transform", "translate(-" + (b.radius() - 15) / 5 + ",-" + (b.radius() - 15) / 100 + ")"), b.postDrawActions()
		}
	};
	return a.prototype = Object.create(microServe.nodes.SetOperatorNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.rdfsclass = function() {
	var a = function(a) {
		microServe.nodes.RoundNode.apply(this, arguments), this.attributes(["rdf"]).type("rdfs:Class")
	};
	return a.prototype = Object.create(microServe.nodes.RoundNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.rdfsdatatype = function() {
	var a = function(a) {
		microServe.nodes.RectangularNode.apply(this, arguments), this.attributes(["datatype"]).type("rdfs:Datatype")
	};
	return a.prototype = Object.create(microServe.nodes.RectangularNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.rdfsliteral = function() {
	var a = function(a) {
		microServe.nodes.RectangularNode.apply(this, arguments);
		var b = this.drawNode,
			c = this.label;
		this.attributes(["datatype"]).label("Literal").styleClass("literal").type("rdfs:Literal").iri("http://www.w3.org/2000/01/rdf-schema#Literal"), this.drawNode = function(a) {
			b(a, ["special"])
		}, this.label = function(a) {
			return arguments.length ? this : c()
		}
	};
	return a.prototype = Object.create(microServe.nodes.RectangularNode.prototype), a.prototype.constructor = a, a
}(), microServe.nodes.rdfsresource = function() {
	var a = function(a) {
		microServe.nodes.RoundNode.apply(this, arguments);
		var b = this.drawNode;
		this.attributes(["rdf"]).label("Resource").radius(30).styleClass("rdfsresource").type("rdfs:Resource"), this.drawNode = function(a) {
			b(a, ["rdf", "special"])
		}
	};
	return a.prototype = Object.create(microServe.nodes.RoundNode.prototype), a.prototype.constructor = a, a
}(), microServe.graph = function(a) {
	function b() {
		t.attr("transform", function(a) {
			return "translate(" + a.x + "," + a.y + ")"
		}), w.attr("d", function(a) {
			if (a.domain() === a.range()) return microServe.util.math().calculateLoopPath(a);
			var b = microServe.util.math().calculateIntersection(a.range(), a.domain(), 1),
				c = microServe.util.math().calculateIntersection(a.domain(), a.range(), 1),
				d = f(a),
				e = microServe.util.math().calculateCurvePoint(b, c, a, d / K.defaultLinkDistance());
			return a.curvePoint(e), J([microServe.util.math().calculateIntersection(a.curvePoint(), a.domain(), 1), e, microServe.util.math().calculateIntersection(a.curvePoint(), a.range(), 1)])
		}), u.attr("transform", function(a) {
			var b = a.curvePoint().x,
				c = a.curvePoint().y;
			return "translate(" + b + "," + c + ")"
		}), x.attr("transform", function(a) {
			var b = a.link().curvePoint(),
				c = microServe.util.math().calculateIntersection(b, a.range(), H),
				d = microServe.util.math().calculateNormalVector(b, a.domain(), I);
			return "translate(" + (c.x + d.x) + "," + (c.y + d.y) + ")"
		})
	}

	function c() {
		o.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
	}

	function d() {
		K.graphContainerSelector(a), D = d3.layout.force().on("tick", b), E = d3.behavior.drag().origin(function(a) {
			return a
		}).on("dragstart", function(a) {
			d3.event.sourceEvent.stopPropagation(), a.locked(!0)
		}).on("drag", function(a) {
			a.px = d3.event.x, a.py = d3.event.y, D.resume()
		}).on("dragend", function(a) {
			a.locked(!1)
		}), F = d3.behavior.zoom().duration(150).scaleExtent([K.minMagnification(), K.maxMagnification()]).on("zoom", c)
	}

	function e(a) {
		var b = f(a);
		return b += a.domain().actualRadius(), b += a.range().actualRadius()
	}

	function f(a) {
		function b(a) {
			return a instanceof microServe.nodes.rdfsdatatype || a instanceof microServe.nodes.rdfsliteral ? !0 : !1
		}
		return b(a.domain()) || b(a.range()) ? K.datatypeDistance() : K.classDistance()
	}

	function g() {
		n(), o = d3.selectAll(K.graphContainerSelector()).append("svg").classed("vowlGraph", !0).attr("width", K.width()).attr("height", K.height()).call(F).append("g")
	}

	function h() {
		var a;
		o && (o.selectAll("*").remove(), s = o.append("g").classed("linkContainer", !0), r = o.append("g").classed("cardinalityContainer", !0), q = o.append("g").classed("labelContainer", !0), p = o.append("g").classed("nodeContainer", !0), a = s.append("defs"), t = p.selectAll(".node").data(y).enter().append("g").classed("node", !0).attr("id", function(a) {
			return a.id()
		}).call(E), t.each(function(a) {
			a.drawNode(d3.select(this))
		}), u = q.selectAll(".labelGroup").data(C).enter().append("g").classed("labelGroup", !0), u.each(function(a) {
			var b = a.property().drawProperty(d3.select(this));
			b || d3.select(this).remove()
		}), u.each(function(a) {
			if (this.parentNode && (a.property() instanceof microServe.labels.rdfssubclassof || a.inverse() instanceof microServe.labels.rdfssubclassof)) {
				var b = this.parentNode;
				b.insertBefore(this, b.firstChild)
			}
		}), x = r.selectAll(".cardinality").data(z).enter().append("g").classed("cardinality", !0), x.each(function(a) {
			var b = a.drawCardinality(d3.select(this));
			b || d3.select(this).remove()
		}), v = s.selectAll(".link").data(C).enter().append("g").classed("link", !0), v.each(function(b) {
			b.drawLink(d3.select(this), a)
		}), w = v.selectAll("path"), i())
	}

	function i() {
		function a(a) {
			K.selectionModules().forEach(function(b) {
				b.handle(a)
			})
		}
		t.on("click", function(b) {
			a(b)
		}), u.selectAll(".label").on("click", function(b) {
			a(b)
		})
	}

	function j() {
		L.parse(K.data()), A = L.nodes(), B = L.properties()
	}

	function k() {
		var a = A,
			b = B;
		K.filterModules().forEach(function(c) {
			C = M.createLinks(b), l(a, C), c.filter(a, b), a = c.filteredNodes(), b = c.filteredProperties()
		}), y = a, z = b, C = M.createLinks(z), l(y, C), D.nodes(y).links(C)
	}

	function l(a, b) {
		for (var c = 0, d = a.length; d > c; c++) {
			for (var e = a[c], f = [], g = 0, h = b.length; h > g; g++) {
				var i = b[g];
				(i.domain() === e || i.range() === e) && f.push(i)
			}
			e.links(f)
		}
	}

	function m() {
		F = F.scaleExtent([K.minMagnification(), K.maxMagnification()]), o && F.event(o), D.charge(K.charge()).size([K.width(), K.height()]).linkDistance(e).gravity(K.gravity()).linkStrength(K.linkStrength())
	}

	function n() {
		o && d3.select(o.node().parentNode).remove()
	}
	var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G = {},
		H = 20,
		I = 10,
		J = d3.svg.line().x(function(a) {
			return a.x
		}).y(function(a) {
			return a.y
		}).interpolate("cardinal"),
		K = microServe.options(),
		L = microServe.parser(G),
		M = microServe.parsing.linkCreator(),
		N = "default";
	return d(), G.graphOptions = function() {
		return K
	}, G.start = function() {
		D.stop(), j(), g(), G.update()
	}, G.updateStyle = function() {
		m(), D.start()
	}, G.reload = function() {
		j(), this.update()
	}, G.update = function() {
		k(), m(), D.start(), h()
	}, G.freeze = function() {
		y && y.forEach(function(a) {
			a.frozen(!0)
		})
	}, G.unfreeze = function() {
		y && (y.forEach(function(a) {
			a.frozen(!1)
		}), D.resume())
	}, G.reset = function() {
		F.translate([0, 0]).scale(1)
	}, G.options = function() {
		return K
	}, G.setLanguage = function(a) {
		N !== a && (N = a || "default", h(), b())
	}, G.getLanguage = function() {
		return N
	}, G
}, microServe.modules.collapsing = function() {
	var a, b, c = {},
		d = !1;
	return c.filter = function(c, e) {
		a = c, b = e;
		var f, g, h;
		for (f = 0, g = c.length; g > f; f++) h = c[f], h instanceof microServe.nodes.RoundNode && h.collapsible(d)
	}, c.enabled = function(a) {
		return arguments.length ? (d = a, c) : d
	}, c.reset = function() {}, c.filteredNodes = function() {
		return a
	}, c.filteredProperties = function() {
		return b
	}, c
}, microServe.modules.compactNotationSwitch = function(a) {
	var b, c, d, e, f = !1,
		g = {},
		h = f;
	return g.filter = function(f, g) {
		b = f, c = g, a.options().compactNotation(h), d = b, e = c
	}, g.enabled = function(a) {
		return arguments.length ? (h = a, g) : h
	}, g.reset = function() {
		h = f
	}, g.filteredNodes = function() {
		return d
	}, g.filteredProperties = function() {
		return e
	}, g
}, microServe.modules.datatypeFilter = function() {
	function a() {
		var a = i.filterNodesAndTidy(c, d, b);
		c = a.nodes, d = a.properties
	}

	function b(a) {
		return a instanceof microServe.nodes.rdfsdatatype || a instanceof microServe.nodes.rdfsliteral ? !1 : !0
	}
	var c, d, e, f, g = {},
		h = !1,
		i = microServe.util.filterTools();
	return g.filter = function(b, g) {
		c = b, d = g, this.enabled() && a(), e = c, f = d
	}, g.enabled = function(a) {
		return arguments.length ? (h = a, g) : h
	}, g.filteredNodes = function() {
		return e
	}, g.filteredProperties = function() {
		return f
	}, g
}, microServe.modules.disjointFilter = function() {
	function a() {
		var a, b, d, e = [];
		for (a = 0, b = c.length; b > a; a++) d = c[a], d instanceof microServe.labels.owldisjointwith || e.push(d);
		c = e
	}
	var b, c, d, e, f = {},
		g = !0;
	return f.filter = function(f, g) {
		b = f, c = g, this.enabled() && a(), d = b, e = c
	}, f.enabled = function(a) {
		return arguments.length ? (g = a, f) : g
	}, f.filteredNodes = function() {
		return d
	}, f.filteredProperties = function() {
		return e
	}, f
}, microServe.modules.filterModuleTemplate = function() {
	var a, b, c = {};
	return c.filter = function(c, d) {
		a = c, b = d
	}, c.filteredNodes = function() {
		return a
	}, c.filteredProperties = function() {
		return b
	}, c
}, microServe.modules.focuser = function() {
	var a, b = {};
	return b.handle = function(b) {
		d3.event.defaultPrevented || (void 0 !== a && a.toggleFocus(), a !== b ? (b.toggleFocus(), a = b) : a = void 0)
	}, b.reset = function() {
		a && (a.toggleFocus(), a = void 0)
	}, b
}, microServe.modules.nodeDegreeFilter = function() {
	function a() {
		for (var a = 0, c = 0, d = e.length; d > c; c++) {
			var f = b(e[c].links());
			a = Math.max(a, f.length)
		}
		i instanceof Function && i(a)
	}

	function b(a) {
		return a.filter(function(a) {
			return !(a.property() instanceof microServe.labels.owldatatypeproperty)
		})
	}

	function c(a) {
		var b = m.filterNodesAndTidy(e, f, d(a));
		e = b.nodes, f = b.properties
	}

	function d(a) {
		return function(c) {
			return b(c.links()).length >= a
		}
	}
	var e, f, g, h, i, j, k = {},
		l = !0,
		m = microServe.util.filterTools();
	return k.filter = function(b, d) {
		e = b, f = d, a(),
			this.enabled() && c(j()), g = e, h = f
	}, k.setMaxDegreeSetter = function(a) {
		i = a
	}, k.setDegreeQueryFunction = function(a) {
		j = a
	}, k.enabled = function(a) {
		return arguments.length ? (l = a, k) : l
	}, k.filteredNodes = function() {
		return g
	}, k.filteredProperties = function() {
		return h
	}, k
}, microServe.modules.nodeScalingSwitch = function(a) {
	var b, c, d, e, f = !0,
		g = {},
		h = f;
	return g.filter = function(f, g) {
		b = f, c = g, a.options().scaleNodesByIndividuals(h), d = b, e = c
	}, g.enabled = function(a) {
		return arguments.length ? (h = a, g) : h
	}, g.reset = function() {
		h = f
	}, g.filteredNodes = function() {
		return d
	}, g.filteredProperties = function() {
		return e
	}, g
}, microServe.modules.pickAndPin = function() {
	var a = {},
		b = !1,
		c = [];
	return a.handle = function(a) {
		b && a instanceof microServe.nodes.RoundNode && !a.pinned() && (a.drawPin(), c.push(a))
	}, a.enabled = function(c) {
		return arguments.length ? (b = c, a) : b
	}, a.reset = function() {
		for (var a = 0, b = c.length; b > a; a++) c[a].removePin();
		c.length = 0
	}, a
}, microServe.modules.selectionDetailsDisplayer = function(a) {
	var b, c = {};
	return c.handle = function(c) {
		if (!d3.event.defaultPrevented) {
			var d = !0;
			b === c && (d = !1), a instanceof Function && a(d ? c : void 0), b = d ? c : void 0
		}
	}, c.reset = function() {
		b && (a(void 0), b = void 0)
	}, c
}, microServe.modules.setOperatorFilter = function() {
	function a() {
		var a = i.filterNodesAndTidy(c, d, b);
		c = a.nodes, d = a.properties
	}

	function b(a) {
		return !(a instanceof microServe.nodes.SetOperatorNode)
	}
	var c, d, e, f, g = {},
		h = !1,
		i = microServe.util.filterTools();
	return g.filter = function(b, g) {
		c = b, d = g, this.enabled() && a(), e = c, f = d
	}, g.enabled = function(a) {
		return arguments.length ? (h = a, g) : h
	}, g.filteredNodes = function() {
		return e
	}, g.filteredProperties = function() {
		return f
	}, g
}, microServe.modules.statistics = function() {
	function a() {
		i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0
	}

	function b(a, b) {
		i = a.length;
		var c, d, e, f = microServe.util.set();
		for (c = 0, d = b.length; d > c; c++) e = b[c], f.has(e) || (j += 1), f.add(e), e.inverse() && f.add(e.inverse())
	}

	function c(a) {
		function b(a) {
			return a instanceof microServe.nodes.rdfsdatatype || a instanceof microServe.nodes.rdfsliteral ? !0 : !1
		}
		var c = d3.set(),
			d = !1;
		a.forEach(function(a) {
			b(a) ? c.add(a.defaultLabel()) : a instanceof microServe.nodes.SetOperatorNode || (a instanceof microServe.nodes.owlthing ? d = !0 : (k += 1, k += f(a.equivalents())))
		}), k += d ? 1 : 0, l = c.size()
	}

	function d(a) {
		for (var b = 0, c = a.length; c > b; b++) {
			var d = a[b];
			d instanceof microServe.labels.owlobjectproperty ? n += e(d) : d instanceof microServe.labels.owldatatypeproperty && (m += e(d))
		}
		o = n + m
	}

	function e(a) {
		var b = 1;
		return b += f(a.equivalents()), b += f(a.redundantProperties())
	}

	function f(a) {
		return a ? a.length : 0
	}

	function g(a, b) {
		a.forEach(function(a) {
			var c = a.type(),
				d = b[c];
			"undefined" == typeof d ? d = 0 : d += 1, b[c] = d
		})
	}

	function h(a) {
		for (var b = 0, c = 0, d = a.length; d > c; c++) b += a[c].individuals().length || 0;
		p = b
	}
	var i, j, k, l, m, n, o, p, q, r, s = {},
		t = {},
		u = {};
	return s.filter = function(e, f) {
		a(), b(e, f), c(e), d(f), g(e, t), g(f, u), h(e), q = e, r = f
	}, s.nodeCount = function() {
		return i
	}, s.occurencesOfClassAndDatatypeTypes = function() {
		return t
	}, s.edgeCount = function() {
		return j
	}, s.occurencesOfPropertyTypes = function() {
		return u
	}, s.classCount = function() {
		return k
	}, s.datatypeCount = function() {
		return l
	}, s.datatypePropertyCount = function() {
		return m
	}, s.objectPropertyCount = function() {
		return n
	}, s.propertyCount = function() {
		return o
	}, s.totalIndividualCount = function() {
		return p
	}, s.filteredNodes = function() {
		return q
	}, s.filteredProperties = function() {
		return r
	}, s
}, microServe.modules.subclassFilter = function() {
	function a() {
		var a, h, i, j, k, l = [],
			m = [],
			n = [];
		for (j = 0, k = g.length; k > j; j++) i = g[j], i instanceof microServe.labels.rdfssubclassof && n.push(i.domain());
		for (j = 0, k = n.length; k > j; j++) h = n[j], a = b(h, g), c(a) && d(h, a) && (l = l.concat(a), m.push(h));
		f = e(f, m), g = e(g, l)
	}

	function b(a, c, d) {
		var e, f, g, h = [];
		for (f = 0, g = c.length; g > f; f++)
			if (e = c[f], (e.domain() === a || e.range() === a) && (h.push(e), e instanceof microServe.labels.rdfssubclassof)) {
				var i = e.domain();
				if (d = d || microServe.util.set(), a === e.range() && !d.has(i)) {
					d.add(i);
					var j = b(i, c, d);
					h = h.concat(j)
				}
			}
		return h
	}

	function c(a) {
		var b, c, d, e = !0;
		for (c = 0, d = a.length; d > c; c++)
			if (b = a[c], !(b instanceof microServe.labels.rdfssubclassof)) {
				e = !1;
				break
			}
		return e
	}

	function d(a, b) {
		for (var c = 0, d = 0, e = b.length; e > d; d++) {
			var f = b[d];
			if (f.domain() === a && (c += 1), c > 1) return !1
		}
		return !0
	}

	function e(a, b) {
		var c, d, e, f = [];
		for (d = 0, e = a.length; e > d; d++) c = a[d], -1 === b.indexOf(c) && f.push(c);
		return f
	}
	var f, g, h, i, j = {},
		k = !1;
	return j.filter = function(b, c) {
		f = b, g = c, this.enabled() && a(), h = f, i = g
	}, j.enabled = function(a) {
		return arguments.length ? (k = a, j) : k
	}, j.filteredNodes = function() {
		return h
	}, j.filteredProperties = function() {
		return i
	}, j
}, microServe.options = function() {
	var a, b, c = {},
		d = 160,
		e = d,
		f = d,
		g = -1e3,
		h = .025,
		i = .7,
		j = 600,
		k = 800,
		l = [],
		m = [],
		n = .1,
		o = 4,
		p = !1,
		q = !1;
	return c.defaultLinkDistance = function() {
		return d
	}, c.charge = function(a) {
		return arguments.length ? (g = +a, c) : g
	}, c.classDistance = function(a) {
		return arguments.length ? (e = +a, c) : e
	}, c.compactNotation = function(a) {
		return arguments.length ? (p = a, c) : p
	}, c.data = function(b) {
		return arguments.length ? (a = b, c) : a
	}, c.datatypeDistance = function(a) {
		return arguments.length ? (f = +a, c) : f
	}, c.filterModules = function(a) {
		return arguments.length ? (m = a, c) : m
	}, c.graphContainerSelector = function(a) {
		return arguments.length ? (b = a, c) : b
	}, c.gravity = function(a) {
		return arguments.length ? (h = +a, c) : h
	}, c.height = function(a) {
		return arguments.length ? (j = +a, c) : j
	}, c.linkStrength = function(a) {
		return arguments.length ? (i = +a, c) : i
	}, c.minMagnification = function(a) {
		return arguments.length ? (n = +a, c) : n
	}, c.maxMagnification = function(a) {
		return arguments.length ? (o = +a, c) : o
	}, c.scaleNodesByIndividuals = function(a) {
		return arguments.length ? (q = a, c) : q
	}, c.selectionModules = function(a) {
		return arguments.length ? (l = a, c) : l
	}, c.width = function(a) {
		return arguments.length ? (k = +a, c) : k
	}, c
}, microServe.parser = function(a) {
	function b(b, c, d) {
		var e = [];
		return b && b.forEach(function(b) {
			var f, g;
			if (c) {
				for (var h = 0; h < c.length; h++) {
					var i = c[h];
					if (b.id === i.id) {
						f = i;
						break
					}
				}
				p(b, f)
			}
			if (g = b.type.replace(":", "").toLowerCase(), g in d) {
				p(b, d[g]);
				var j = new d[g](a);
				if (j.annotations(b.annotations).comment(b.comment).complement(b.complement).description(b.description).equivalents(b.equivalent).id(b.id).intersection(b.intersection).label(b.label).union(b.union).iri(b.iri), b.individuals && b.individuals.forEach(function(b) {
						var c = new d[g](a);
						c.label(b.labels).iri(b.iri), j.individuals().push(c)
					}), b.attributes) {
					var k = d3.set(b.attributes.concat(j.attributes()));
					j.attributes(k.values())
				}
				e.push(j)
			} else console.error("Unknown element type: " + g)
		}), e
	}

	function c(b, c, d) {
		var e = [];
		return b && b.forEach(function(b) {
			var f, g;
			if (c) {
				for (var h = 0; h < c.length; h++) {
					var i = c[h];
					if (b.id === i.id) {
						f = i;
						break
					}
				}
				p(b, f)
			}
			if (g = b.type.replace(":", "").toLowerCase(), g in d) {
				var j = new d[g](a);
				if (j.annotations(b.annotations).cardinality(b.cardinality).comment(b.comment).domain(b.domain).description(b.description).equivalents(b.equivalent).id(b.id).inverse(b.inverse).label(b.label).minCardinality(b.minCardinality).maxCardinality(b.maxCardinality).range(b.range).subproperties(b.subproperty).superproperties(b.superproperty).iri(b.iri), b.attributes) {
					var k = d3.set(b.attributes.concat(j.attributes()));
					j.attributes(k.values())
				}
				e.push(j)
			} else console.error("Unknown element type: " + g)
		}), e
	}

	function d(b, c) {
		var d, f, g, h, i = c.slice(),
			j = d3.set(),
			k = "GENERATED-MERGED_RANGE-";
		for (c.length = 0, d = 0, f = b.length; f > d; d++) {
			var l = b[d],
				m = l.equivalents();
			if (0 !== m.length && 0 !== l.range().indexOf(k)) {
				var n;
				n = l instanceof microServe.labels.owldatatypeproperty ? new microServe.nodes.rdfsliteral(a) : new microServe.nodes.owlthing(a), n.id(k + l.id()), c.push(n);
				var p = l.range();
				for (l.range(n.id()), g = 0, h = m.length; h > g; g++) {
					var q = m[g],
						r = v[q],
						s = r.range();
					r.range(n.id()), e(s, b) || j.add(s)
				}
				e(p, b) || j.add(p)
			}
		}
		for (d = 0, f = i.length; f > d; d++) {
			var t = i[d];
			j.has(t.id()) || c.push(t)
		}
		u = o(c)
	}

	function e(a, b) {
		var c, d;
		for (c = 0, d = b.length; d > c; c++) {
			var e = b[c];
			if (e.domain() === a || e.range() === a) return !0
		}
		return !1
	}

	function f(a, b) {
		var c = [],
			d = 0;
		return a.forEach(function(a) {
			d = Math.max(d, a.individuals().length), a.visible(!0)
		}), a.forEach(function(a) {
			m(a, b), x.parseClassAttributes(a), a.maxIndividualCount(d)
		}), a.forEach(function(a) {
			a.visible() && c.push(a)
		}), c
	}

	function g(a) {
		if (a instanceof microServe.labels.owldisjointwith != !1) {
			var b = a.domain(),
				c = a.range();
			b.disjointWith() || b.disjointWith([]), c.disjointWith() || c.disjointWith([]), b.disjointWith().push(a.range()), c.disjointWith().push(a.domain())
		}
	}

	function h(a, b, c) {
		var d = [];
		return a.forEach(function(a) {
			a.visible(!0)
		}), a.forEach(function(a) {
			var d, e, f, g, h;
			if (a.domain() && a.range() || a.inverse()) {
				var j = r(a.inverse());
				j && (h = c[j], h || console.warn("No inverse property was found for id: " + j)), "undefined" != typeof a.domain() && "undefined" != typeof a.range() ? (d = r(a.domain()), e = r(a.range()), f = b[d], g = b[e]) : h ? (d = r(h.range()), e = r(h.domain()), f = b[d], g = b[e]) : console.warn("Domain and range not found for property: " + a.id()), a.domain(f), a.range(g), h && (a.inverse(h), h.inverse(a), h.domain(g), h.range(f))
			}
			i(a.subproperties()), i(a.superproperties())
		}), a.forEach(function(a) {
			m(a, c), g(a), x.parsePropertyAttributes(a)
		}), a.forEach(function(b) {
			var c = !1;
			j(b.domain()) && (b.domain(b.domain().equivalentBase()), c = !0), j(b.range()) && (b.range(b.range().equivalentBase()), c = !0);
			var e = k(a, b);
			c && e && (b.visible(!1), e.redundantProperties().push(b)), b.domain().visible() && b.range().visible() || b.visible(!1), b.visible() && d.push(b)
		}), d
	}

	function i(a) {
		var b, c;
		if (a)
			for (b = 0, c = a.length; c > b; ++b) {
				var d = r(a[b]),
					e = v[d];
				e ? a[b] = e : console.warn("No sub-/superproperty was found for id: " + d)
			}
	}

	function j(a) {
		return !a.visible() && a.equivalentBase()
	}

	function k(a, b) {
		var c, d, e;
		for (c = 0, d = a.length; d > c; c++)
			if (e = a[c], b !== e && b.domain() === e.domain() && b.range() === e.range())
				if (b.iri() && e.iri()) {
					if (b.iri() === e.iri()) return e
				} else if (b.type() === e.type() && b.defaultLabel() === e.defaultLabel()) return e;
		return void 0
	}

	function l(a, b) {
		function c(a, c, f) {
			if ("undefined" != typeof c)
				for (d = 0, e = c.length; e > d; ++d) {
					var g = c[d],
						h = {};
					h.id = "GENERATED-" + f + "-" + a + "-" + g + "-" + d, h.type = "setOperatorProperty", h.domain = a, h.range = g, b.push(h)
				}
		}
		var d, e;
		a.forEach(function(a) {
			c(a.id(), a.complement(), "COMPLEMENT"), c(a.id(), a.intersection(), "INTERSECTION"), c(a.id(), a.union(), "UNION")
		})
	}

	function m(a, b) {
		var c = a.equivalents();
		if (c && !a.equivalentBase())
			for (var d = 0, e = c.length; e > d; ++d) {
				var f = r(c[d]),
					g = b[f];
				g ? (g.equivalents(g.equivalents()), g.equivalents().push(a), g.equivalentBase(a), c[d] = g, g.visible(!1)) : console.warn("No class/property was found for equivalent id: " + f)
			}
	}

	function n(a, b) {
		a.forEach(function(a) {
			"string" == typeof a.iri() && a.iri(q(a.iri(), b))
		})
	}

	function o(a) {
		for (var b = {}, c = 0, d = a.length; d > c; c++) {
			var e = a[c];
			b[e.id()] = e
		}
		return b
	}

	function p(a, b) {
		b = b || {};
		for (var c in b) c in a || !b.hasOwnProperty(c) || (a[c] = b[c]);
		return a
	}

	function q(a, b) {
		var c = a.indexOf(":");
		if (-1 === c) return a;
		for (var d = a.substring(0, c), e = 0, f = b.length; f > e; ++e) {
			var g = b[e];
			if (d === g.name) return g.iri + a.substring(c + 1)
		}
		return a
	}

	function r(a) {
		return a ? "string" == typeof a ? a : "id" in a ? a.id() : void console.warn("No Id was found for this object: " + a) : void 0
	}
	var s, t, u, v, w = {},
		x = microServe.parsing.attributeParser();
	return w.parse = function(a) {
		if (!a) return s = [], void(t = []);
		var e, g = b(a["class"], a.classAttribute, microServe.nodes),
			i = b(a.datatype, a.datatypeAttribute, microServe.nodes),
			j = g.concat(i);
		l(j, a.property), e = c(a.property, a.propertyAttribute, microServe.labels), u = o(j), v = o(e), d(e, j), n(j, a.namespace), n(e, a.namespace), s = f(j, u), t = h(e, u, v)
	}, w.nodes = function() {
		return s
	}, w.properties = function() {
		return t
	}, w
}, microServe.parsing.attributeParser = function() {
	function a(a) {
		var b, c, d, j = [e, f, g, h, i];
		for (b = 0, c = j.length; c > b; b++)
			if (d = j[b], a.attributes().contains(d)) {
				a.visualAttribute(d);
				break
			}
	}

	function b(a) {
		var b, c, d, g = [e, f];
		for (b = 0, c = g.length; c > b; b++) d = g[b], a.attributes().contains(d) && a.indications().push(d)
	}

	function c(a) {
		var b, c, d, e = [j, k, m, l];
		for (b = 0, c = e.length; c > b; b++) d = e[b], a.attributes().contains(d) && a.indications().push(d)
	}
	var d = {},
		e = "deprecated",
		f = "external",
		g = "datatype",
		h = "object",
		i = "rdf",
		j = "functional",
		k = "inverse functional",
		l = "transitive",
		m = "symmetric";
	return d.parseClassAttributes = function(c) {
			c.attributes() instanceof Array && (a(c), b(c))
		}, d.parsePropertyAttributes = function(b) {
			b.attributes() instanceof Array && (a(b), c(b))
		},
		function() {
			return d
		}
}(), microServe.parsing.linkCreator = function() {
	function a(a) {
		for (var b, c = [], d = microServe.util.set(), e = 0, f = a.length; f > e; e++)
			if (b = a[e], !d.has(b)) {
				var g = microServe.elements.link();
				g.property(b), g.domain(b.domain()), g.range(b.range()), b.link(g), d.add(b);
				var h = b.inverse();
				h && (g.inverse(h), h.link(g), d.add(h)), c.push(g)
			}
		return c
	}

	function b(a, b) {
		var c, d, e, f;
		if ("undefined" == typeof a.layerCount()) {
			for (d = [], e = 0, f = b.length; f > e; e++) {
				var g = b[e];
				(a.domain() === g.domain() && a.range() === g.range() || a.domain() === g.range() && a.range() === g.domain()) && d.push(g)
			}
			for (e = 0, f = d.length; f > e; ++e) c = d[e], c.layerIndex(e), c.layerCount(f), c.layers(d)
		}
	}

	function c(a, b) {
		var c, d, e, f;
		if ("undefined" == typeof a.loopCount()) {
			for (d = [], e = 0, f = b.length; f > e; e++) {
				var g = b[e];
				a.domain() === g.domain() && a.domain() === g.range() && d.push(g)
			}
			for (e = 0, f = d.length; f > e; ++e) c = d[e], c.loopIndex(e), c.loopCount(f), c.loops(d)
		}
	}
	var d = {};
	return d.createLinks = function(d) {
			for (var e = a(d), f = 0, g = e.length; g > f; f++) {
				var h = e[f];
				b(h, e), c(h, e)
			}
			return e
		},
		function() {
			return d
		}
}(), microServe.util.constants = function() {
	var a = {};
	return a.LANG_IRIBASED = "IRI-based", a.LANG_UNDEFINED = "undefined",
		function() {
			return a
		}
}(), microServe.util.filterTools = function() {
	function a(a, b) {
		return !a.has(b.domain()) && !a.has(b.range())
	}
	var b = {};
	return b.filterNodesAndTidy = function(b, c, d) {
			var e = microServe.util.set(),
				f = [],
				g = [];
			return b.forEach(function(a) {
				d(a) ? f.push(a) : e.add(a)
			}), c.forEach(function(b) {
				if (a(e, b)) g.push(b);
				else if (b instanceof microServe.labels.owldatatypeproperty) {
					var c = f.indexOf(b.range());
					c >= 0 && f.splice(c, 1)
				}
			}), {
				nodes: f,
				properties: g
			}
		},
		function() {
			return b
		}
}();
var ADDITIONAL_TEXT_SPACE = 4;
String.prototype.width = function(a) {
	a || (a = "text");
	var b = d3.select("body").append("div").attr("class", a).attr("id", "width-test").text(this),
		c = document.getElementById("width-test").offsetWidth;
	return b.remove(), c
}, String.prototype.truncate = function(a, b) {
	if (a -= ADDITIONAL_TEXT_SPACE, isNaN(a) || 0 >= a) return this;
	for (var c, d, e = this, f = this.length;;) {
		if (c = e.width(b), a >= c) break;
		d = c / a, f = Math.floor(f / d), e = e.substring(0, f)
	}
	return this.length > f ? this.substring(0, f - 3) + "..." : this
}, Array.prototype.contains = function(a) {
	for (var b = this.length; b--;)
		if (this[b] === a) return !0;
	return !1
}, microServe.util.languageTools = function() {
	function a(a, b) {
		for (var c in a)
			if (c === b && a.hasOwnProperty(c)) return a[c]
	}
	var b = {};
	return b.textForCurrentLanguage = function(b, c) {
			if ("undefined" == typeof b) return void 0;
			if ("string" == typeof b) return b;
			if (b.hasOwnProperty(c)) return b[c];
			var d = a(b, "en");
			return d ? d : (d = a(b, microServe.util.constants().LANG_UNDEFINED), d ? d : b[microServe.util.constants().LANG_IRIBASED])
		},
		function() {
			return b
		}
}(), microServe.util.math = function() {
	function a(a, b) {
		var c = Math.floor((a.layerIndex() - a.layerCount() % 2) / 2) + 1,
			d = a.layerCount() % 2 * 15,
			e = 0;
		switch (c) {
			case 1:
				e = 20 + d;
				break;
			case 2:
				e = 50 + d
		}
		return e * b
	}

	function b(a) {
		a %= 360, 0 > a && (a += 360);
		var b = 2 * Math.PI * a / 360;
		return 0 > b && (b += 2 * Math.PI), b
	}
	var c = {},
		d = d3.svg.line().x(function(a) {
			return a.x
		}).y(function(a) {
			return a.y
		}).interpolate("cardinal").tension(-1);
	return c.calculateNormalVector = function(a, b, c) {
			var d = b.x - a.x,
				e = b.y - a.y,
				f = -e,
				g = d,
				h = Math.sqrt(f * f + g * g),
				i = c / h;
			return {
				x: f * i,
				y: g * i
			}
		}, c.calculateCurvePoint = function(b, d, e, f) {
			var g = a(e, f),
				h = d.x - b.x,
				i = d.y - b.y,
				j = b.x + h / 2,
				k = b.y + i / 2,
				l = c.calculateNormalVector(b, d, g);
			return e.layerIndex() % 2 !== 0 && (l.x = -l.x, l.y = -l.y), e.domain().index < e.range().index && (l.x = -l.x, l.y = -l.y), {
				x: j + l.x,
				y: k + l.y
			}
		}, c.calculateLoopPath = function(a) {
			var c = a.domain(),
				e = 360 / a.loopCount(),
				f = Math.min(60, .8 * e),
				g = b(e * a.loopIndex()),
				h = b(e * a.loopIndex() + f),
				i = Math.cos(g) * c.actualRadius(),
				j = Math.sin(g) * c.actualRadius(),
				k = Math.cos(h) * c.actualRadius(),
				l = Math.sin(h) * c.actualRadius(),
				m = {
					x: c.x + i,
					y: c.y + j
				},
				n = {
					x: c.x + k,
					y: c.y + l
				},
				o = 2.5,
				p = (i + k) / 2 * o,
				q = (j + l) / 2 * o,
				r = {
					x: c.x + p,
					y: c.y + q
				};
			return a.curvePoint(r), d([m, r, n])
		}, c.calculateIntersection = function(a, b, c) {
			var d, e = b.x - a.x,
				f = b.y - a.y;
			if (b instanceof microServe.nodes.RoundNode) d = b.actualRadius();
			else {
				var g = Math.abs(f / e),
					h = b.height() / b.width();
				if (h >= g) {
					var i = e / (b.width() / 2),
						j = f / i;
					d = Math.sqrt(Math.pow(b.width() / 2, 2) + Math.pow(j, 2))
				} else {
					var k = f / (b.height() / 2),
						l = e / k;
					d = Math.sqrt(Math.pow(b.height() / 2, 2) + Math.pow(l, 2))
				}
			}
			var m = Math.sqrt(e * e + f * f),
				n = (m - (d + c)) / m,
				o = e * n + a.x,
				p = f * n + a.y;
			return {
				x: o,
				y: p
			}
		},
		function() {
			return c
		}
}(), microServe.util.set = function(a) {
	var b = {},
		c = d3.set(a);
	return b.has = function(a) {
		return c.has(a.id())
	}, b.add = function(a) {
		return c.add(a.id())
	}, b.remove = function(a) {
		return c.remove(a.id())
	}, b.empty = function() {
		return c.empty()
	}, b.size = function() {
		return c.size()
	}, b
}, microServe.util.textElement = function(a) {
	function b() {
		var a = c();
		if (1 > a) return void k.attr("y", 0);
		var b = g(k);
		k.attr("y", .6 * -b + "px")
	}

	function c() {
		return k.property("childElementCount") - k.selectAll(".instance-count").size()
	}

	function d(d, g, h, j) {
		if (d) {
			var l, m;
			g = g || "text", l = d.truncate(a.datum().textWidth(), g), m = k.append("tspan").classed("text", !0).classed(g, !0).text(e(l, h, j)).attr("x", 0).attr("dy", function() {
				var a = f(d3.select(this)),
					b = c() - 1,
					d = b > 0 ? i : 0;
				return a + d + "px"
			}), b()
		}
	}

	function e(a, b, c) {
		return b && (a = b + a), c && (a += c), a
	}

	function f(a) {
		return a.classed("subtext") ? 10 : 14
	}

	function g(a) {
		var b = a.selectAll("*"),
			c = b.size();
		if (0 === c) return 0;
		var d = c * i;
		return b.each(function() {
			d += f(d3.select(this))
		}), d
	}
	var h = {},
		i = 1,
		j = "subtext",
		k = a.append("text").classed("text", !0).attr("text-anchor", "middle");
	return h.addText = function(a) {
		d(a)
	}, h.addSubText = function(a) {
		d(a, j, "(", ")")
	}, h.addEquivalents = function(a) {
		d(a, j, "[", "]")
	}, h.addInstanceCount = function(a) {
		a && d(a.toString(), "instance-count")
	}, h.setTranslation = function(a, b) {
		k.attr("transform", "translate(" + a + ", " + b + ")")
	}, h.clear = function() {
		k.selectAll("*").remove()
	}, h
};
//# sourceMappingURL=microServe.min.js.map