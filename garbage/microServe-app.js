/*! microServe v0.0.1 */

"use strict";

function getInternetExplorerVersion() {
	var a, b, c = -1;
	return "Microsoft Internet Explorer" === navigator.appName ? (a = navigator.userAgent, b = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"), null !== b.exec(a) && (c = parseFloat(RegExp.$1))) : "Netscape" === navigator.appName && (a = navigator.userAgent, b = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"), null !== b.exec(a) && (c = parseFloat(RegExp.$1))), c
}
var microServeApp = microServeApp || {};
microServeApp.app = function() {
	function a(a, b, c) {
		i.reset();
		var e;
		if (a && (e = JSON.parse(a), !b)) {
			var f = e.header ? e.header.title : void 0,
				g = n.textForCurrentLanguage(f);
			b = g ? g : c
		}
		d.setJsonText(a), m.data(e), l.reload(), p.updateOntologyInformation(e, q), d.setFilename(b)
	}

	function b() {
		var a = d3.select(o),
			b = a.select("svg"),
			c = window.innerHeight - 40,
			d = window.innerWidth - .22 * window.innerWidth;
		a.style("height", c + "px"), b.attr("width", d).attr("height", c), m.width(d).height(c), l.updateStyle()
	}
	var c, d, e, f, g, h, i, j, k = {},
		l = microServe.graph(),
		m = l.graphOptions(),
		n = microServe.util.languageTools(),
		o = "#graph",
		p = microServeApp.sidebar(l),
		q = microServe.modules.statistics(),
		r = microServe.modules.focuser(),
		s = microServe.modules.selectionDetailsDisplayer(p.updateSelectionInformation),
		t = microServe.modules.datatypeFilter(),
		u = microServe.modules.subclassFilter(),
		v = microServe.modules.disjointFilter(),
		w = microServe.modules.nodeDegreeFilter(),
		x = microServe.modules.setOperatorFilter(),
		y = microServe.modules.nodeScalingSwitch(l),
		z = microServe.modules.compactNotationSwitch(l),
		A = microServe.modules.pickAndPin();
	return k.initialize = function() {
		m.graphContainerSelector(o),
		m.selectionModules().push(r),
		m.selectionModules().push(s),
		m.selectionModules().push(A),
		m.filterModules().push(q),
		m.filterModules().push(t),
		m.filterModules().push(u),
		m.filterModules().push(v),
		m.filterModules().push(x),
		m.filterModules().push(y),
		m.filterModules().push(w),
		m.filterModules().push(z),
		d = microServeApp.exportMenu(m.graphContainerSelector()),
		e = microServeApp.gravityMenu(l),
		f = microServeApp.filterMenu(l, t, u, v, x, w),
		g = microServeApp.modeMenu(l, A, y, z),
		i = microServeApp.pauseMenu(l),
		h = microServeApp.resetMenu(l, [e, f, g, r, s, i]),
		c = microServeApp.ontologyMenu(a),
		d3.select(window).on("resize", b),
		j = [d, e, f, g, h, i, p, c],
        j.forEach(function(a) {
			a.setup()
		}),
		l.start(),
		b()
	}, k
};
var version = getInternetExplorerVersion();
if (version > 0 && 11 >= version) {
	document.write('<div id="browserCheck">The microServe demo does not work in Internet Explorer. Please use another browser, such as <a href="http://www.mozilla.org/firefox/">Mozilla Firefox</a> or <a href="https://www.google.com/chrome/">Google Chrome</a>, to run the microServe demo.</div>');
	var canvasArea = document.getElementById("canvasArea"),
		detailsArea = document.getElementById("detailsArea"),
		optionsArea = document.getElementById("optionsArea");
	canvasArea.className = "hidden", detailsArea.className = "hidden", optionsArea.className = "hidden"
}
microServeApp.exportMenu = function(a) {
	function b() {
		var b, h, k, l = d3.select(a).select("svg");
		d(), e(), b = l.attr("version", 1.1).attr("xmlns", "http://www.w3.org/2000/svg").node().parentNode.innerHTML, b = "<!-- Created with microServe (version " + microServeApp.version + "), http://vowl.visualdataweb.org -->\n" + b, h = c(b), k = "data:image/svg+xml;base64," + btoa(h), i.attr("href", k).attr("download", j + ".svg"), f(), g()
	}

	function c(a) {
		var b, c, d, e = [],
			f = a.length;
		for (b = 0; f > b; b++) c = a.charAt(b), d = c.charCodeAt(0), e.push(255 > d ? c : "&#" + d + ";");
		return e.join("")
	}

	function d() {
		d3.selectAll(".text").style("font-family", "Helvetica, Arial, sans-serif").style("font-size", "12px"), d3.selectAll(".subtext").style("font-size", "9px"), d3.selectAll(".cardinality").style("font-size", "10px"), d3.selectAll(".text, .embedded").style("pointer-events", "none"), d3.selectAll(".class, .object, .disjoint, .objectproperty, .disjointwith, .equivalentproperty, .transitiveproperty, .functionalproperty, .inversefunctionalproperty, .symmetricproperty").style("fill", "#acf"), d3.selectAll(".label .datatype, .datatypeproperty").style("fill", "#9c6"), d3.selectAll(".rdf, .rdfproperty").style("fill", "#c9c"), d3.selectAll(".literal, .node .datatype").style("fill", "#fc3"), d3.selectAll(".deprecated, .deprecatedproperty").style("fill", "#ccc"), d3.selectAll(".external, .externalproperty").style("fill", "#36c"), d3.selectAll("path, .nofill").style("fill", "none"), d3.selectAll(".symbol").style("fill", "#69c"), d3.selectAll(".arrowhead, marker path").style("fill", "#000"), d3.selectAll(".class, path, line, .fineline").style("stroke", "#000"), d3.selectAll(".white, .subclass, .dottedMarker path, .subclassproperty, .external + text").style("fill", "#fff"), d3.selectAll(".class.hovered, .property.hovered, path.arrowhead.hovered, .cardinality.hovered, .normalMarker path.hovered, .cardinality.focused, .normalMarker path.focused, circle.pin").style("fill", "#f00").style("cursor", "pointer"), d3.selectAll(".focused, path.hovered").style("stroke", "#f00"), d3.selectAll(".label .indirectHighlighting, .feature:hover").style("fill", "#f90"), d3.selectAll(".class, path, line").style("stroke-width", "2"), d3.selectAll(".fineline").style("stroke-width", "1"), d3.selectAll(".special").style("stroke-dasharray", "8"), d3.selectAll(".dotted").style("stroke-dasharray", "3"), d3.selectAll("rect.focused, circle.focused").style("stroke-width", "4px"), d3.selectAll(".nostroke").style("stroke", "none"), d3.selectAll("#width-test").style("position", "absolute").style("float", "left").style("white-space", "nowrap").style("visibility", "hidden"), d3.selectAll("marker path").style("stroke-dasharray", "50")
	}

	function e() {
		d3.selectAll(".hidden-in-export").style("display", "none")
	}

	function f() {
		d3.selectAll(".text, .subtext, .cardinality, .text, .embedded, .class, .object, .disjoint, .objectproperty, .disjointwith, .equivalentproperty, .transitiveproperty, .functionalproperty, .inversefunctionalproperty, .symmetricproperty, .label .datatype, .datatypeproperty, .rdf, .rdfproperty, .literal, .node .datatype, .deprecated, .deprecatedproperty, .external, .externalproperty, path, .nofill, .symbol, .arrowhead, marker path, .class, path, line, .fineline, .white, .subclass, .dottedMarker path, .subclassproperty, .external + text, .class.hovered, .property.hovered, path.arrowhead.hovered, .cardinality.hovered, .normalMarker path.hovered, .cardinality.focused, .normalMarker path.focused, circle.pin, .focused, path.hovered, .label .indirectHighlighting, .feature:hover, .class, path, line, .fineline, .special, .dotted, rect.focused, circle.focused, .nostroke, #width-test, marker path").attr("style", null)
	}

	function g() {
		d3.selectAll(".hidden-in-export").style("display", null)
	}

	function h() {
		if (!l) return alert("No graph data available."), void d3.event.preventDefault();
		var a = "data:text/json;charset=utf-8," + encodeURIComponent(l);
		k.attr("href", a).attr("download", j + ".json")
	}
	var i, j, k, l, m = {};
	return m.setup = function() {
		i = d3.select("#exportSvg").on("click", b), k = d3.select("#exportJson").on("click", h)
	}, m.setFilename = function(a) {
		j = a || "export"
	}, m.setJsonText = function(a) {
		l = a
	}, m
}, microServeApp.filterMenu = function(a, b, c, d, e, f) {
	function g(b, c, d, e) {
		var f, g;
		f = d3.select(e).append("div").classed("checkboxContainer", !0), g = f.append("input").classed("filterCheckbox", !0).attr("id", c + "FilterCheckbox").attr("type", "checkbox").property("checked", b.enabled()), k.push({
			checkbox: g,
			defaultState: b.enabled()
		}), g.on("click", function() {
			var c = g.property("checked");
			b.enabled(c), a.update()
		}), f.append("label").attr("for", c + "FilterCheckbox").text(d)
	}

	function h(b) {
		f.setMaxDegreeSetter(function(a) {
			i.attr("max", a), i.property("value", Math.min(a, i.property("value")))
		}), f.setDegreeQueryFunction(function() {
			return i.property("value")
		});
		var c, d;
		c = d3.select(b).append("div").classed("distanceSliderContainer", !0), i = c.append("input").attr("id", "nodeDegreeDistanceSlider").attr("type", "range").attr("min", 0).attr("step", 1), c.append("label").classed("description", !0).attr("for", "nodeDegreeDistanceSlider").text("Degree of collapsing"), d = c.append("label").classed("value", !0).attr("for", "nodeDegreeDistanceSlider").text(0), i.on("change", function() {
			a.update()
		}), i.on("input", function() {
			var a = i.property("value");
			d.text(a)
		})
	}
	var i, j = {},
		k = [];
	return j.setup = function() {
		g(b, "datatype", "Datatype prop.", "#datatypeFilteringOption"), g(c, "subclass", "Solitary subclass.", "#subclassFilteringOption"), g(d, "disjoint", "Disjointness info", "#disjointFilteringOption"), g(e, "setoperator", "Set operators", "#setOperatorFilteringOption"), h("#nodeDegreeFilteringOption")
	}, j.reset = function() {
		k.forEach(function(a) {
			var b = a.checkbox,
				c = a.defaultState,
				d = b.property("checked");
			d !== c && (b.property("checked", c), b.on("click")())
		}), i.property("value", 0), i.on("change")()
	}, j
}, microServeApp.gravityMenu = function(a) {
	function b(b, d, f, g) {
		var h, i;
		h = d3.select(b).append("div").datum({
			distanceFunction: g
		}).classed("distanceSliderContainer", !0);
		var j = h.append("input").attr("id", d + "DistanceSlider").attr("type", "range").attr("min", 10).attr("max", 600).attr("value", g()).attr("step", 10);
		h.append("label").classed("description", !0).attr("for", d + "DistanceSlider").text(f), i = h.append("label").classed("value", !0).attr("for", d + "DistanceSlider").text(g()), e.push(j), j.on("input", function() {
			var b = j.property("value");
			g(b), c(), i.text(b), a.updateStyle()
		})
	}

	function c() {
		var a = Math.max(f.classDistance(), f.datatypeDistance()),
			b = a / h,
			c = g * b;
		f.charge(c)
	}
	var d = {},
		e = [],
		f = a.graphOptions(),
		g = f.charge(),
		h = f.defaultLinkDistance();
	return d.setup = function() {
		b("#classSliderOption", "class", "Class distance", f.classDistance), b("#datatypeSliderOption", "datatype", "Datatype distance", f.datatypeDistance)
	}, d.reset = function() {
		e.forEach(function(a) {
			a.property("value", function(a) {
				return a.distanceFunction()
			}), a.on("input")()
		})
	}, d
}, microServeApp.modeMenu = function(a, b, c, d) {
	function e(b, c, d, e, f) {
		var h, i;
		h = d3.select(e).append("div").classed("checkboxContainer", !0).datum({
			module: b,
			defaultState: b.enabled()
		}), i = h.append("input").classed("moduleCheckbox", !0).attr("id", c + "ModuleCheckbox").attr("type", "checkbox").property("checked", b.enabled()), g.push(i), i.on("click", function(b) {
			var c = i.property("checked");
			b.module.enabled(c), f && a.update()
		}), h.append("label").attr("for", c + "ModuleCheckbox").text(d)
	}
	var f = {},
		g = [];
	return f.setup = function() {
		e(b, "pickandpin", "Pick & Pin", "#pickAndPinOption", !1), e(c, "nodescaling", "Node Scaling", "#nodeScalingOption", !0), e(d, "compactnotation", "Compact Notation", "#compactNotationOption", !0)
	}, f.reset = function() {
		g.forEach(function(a) {
			var b = a.datum().defaultState,
				c = a.property("checked");
			c !== b && (a.property("checked", b), a.on("click")(a.datum())), a.datum().module.reset()
		})
	}, f
}, microServeApp.ontologyMenu = function(a) {
	function b() {
		d(), d3.select(window).on("hashchange", function() {
			var a = d3.event.oldURL,
				b = d3.event.newURL;
			if (a !== b) {
				if (b === a + "#") return;
				c(), d()
			}
		}), c()
	}

	function c() {
		d3.selectAll("#optionsMenu > li > a").attr("href", location.hash || "#")
	}

	function d() {
		var a = location.hash.slice(1);
		a || (a = p);
		var b = d3.selectAll(".select li").classed("selected-ontology", !1),
			c = "iri=",
			d = "file=";
		if (a.substr(0, d.length) === d) {
			var f = a.slice(d.length);
			h(f)
		} else if (a.substr(0, c.length) === c) {
			var g = a.slice(c.length);
			e("converter.php?iri=" + encodeURIComponent(g), g), d3.select("#converter-option").classed("selected-ontology", !0)
		} else e(o + a + ".json", a), b.each(function() {
			var b = d3.select(this);
			b.select("a").size() > 0 && b.select("a").attr("href") === "#" + a && b.classed("selected-ontology", !0)
		})
	}

	function e(b, c) {
		var d = s[b],
			e = c.replace(/\/$/g, ""),
			f = e.slice(e.lastIndexOf("/") + 1);
		d ? (a(d, void 0, f), k(!0)) : (j(), d3.xhr(b, "application/json", function(c, d) {
			var e, g, h = !c;
			h ? (g = d.responseText, s[b] = g) : 404 === c.status && (e = "Converter.php was not found. Please make sure that PHP is running."), a(g, void 0, f), k(h, c ? c.response : void 0, e), l()
		}))
	}

	function f() {
		var a = d3.select("#iri-converter-button"),
			b = d3.select("#iri-converter-input");
		b.on("input", function() {
			i();
			var c = "" === b.property("value");
			a.attr("disabled", c || void 0)
		}).on("click", function() {
			i()
		}), d3.select("#iri-converter-form").on("submit", function() {
			return location.hash = "iri=" + b.property("value"), b.property("value", ""), b.on("input")(), d3.event.preventDefault(), !1
		})
	}

	function g() {
		var a = d3.select("#file-converter-input"),
			b = d3.select("#file-converter-label"),
			c = d3.select("#file-converter-button");
		a.on("change", function() {
			var d = a.property("files");
			d.length <= 0 ? (b.text("Please select a file"), c.property("disabled", !0)) : (b.text(d[0].name), c.property("disabled", !1), i())
		}), c.on("click", function() {
			var b = a.property("files")[0];
			if (!b) return !1;
			var c = "file=" + b.name;
			location.hash === "#" + c ? h() : location.hash = c
		})
	}

	function h(b) {
		var c = d3.select("#file-converter-input"),
			d = d3.select("#file-converter-button"),
			e = s[b];
		if (e) return a(e, b), void k(!0);
		var f = c.property("files")[0];
		if (!f || b && b !== f.name) return a(void 0, void 0), void k(!1, void 0, 'No cached version of "' + b + '" was found. Please reupload the file.');
		b = f.name, j(), d.property("disabled", !0);
		var g = new FormData;
		g.append("ontology", f);
		var h = new XMLHttpRequest;
		h.open("POST", "converter.php", !0), h.onload = function() {
			if (d.property("disabled", !1), 200 === h.status) {
				var c = b.split(".")[0];
				a(h.responseText, c), s[b] = h.responseText
			} else a(void 0, void 0), k(!1, h.responseText);
			l()
		}, h.send(g)
	}

	function i() {
		function a() {
			b.style("display", void 0), clearTimeout(m), d3.select(window).on("click", void 0).on("keydown", void 0), b.on("mouseover", void 0)
		}
		var b = d3.select("#select .toolTipMenu");
		b.on("click", function() {
			d3.event.stopPropagation()
		}).on("keydown", function() {
			d3.event.stopPropagation()
		}), b.style("display", "block"), clearTimeout(m), m = setTimeout(function() {
			a()
		}, 3e3), d3.select(window).on("click", function() {
			a()
		}).on("keydown", function() {
			a()
		}), b.on("mouseover", function() {
			a()
		})
	}

	function j() {
		q.classed("hidden", !0), r.classed("hidden", !1)
	}

	function k(a, b, c) {
		q.classed("hidden", a);
		var d = d3.select("#error-info");
		c ? d.text(c) : d.html('Ontology could not be loaded.<br>Is it a valid OWL ontology? Please check with <a target="_blank"href="http://mowl-power.cs.man.ac.uk:8080/validator/">OWL Validator</a>.');
		var e = !b,
			f = d3.select("#error-description-button").classed("hidden", e).datum().open;
		d3.select("#error-description-container").classed("hidden", e || !f), d3.select("#error-description").text(b || "")
	}

	function l() {
		r.classed("hidden", !0)
	}
	var m, n = {},
		o = "scripts/data/",
		p = "foaf",
		q = d3.select("#loading-error"),
		r = d3.select("#loading-progress"),
		s = {};
	return n.setup = function() {
		f(), g();
		var a = d3.select("#error-description-button").datum({
			open: !1
		});
		a.on("click", function(a) {
			var b = d3.select("#error-description-container"),
				c = d3.select(this);
			a.open = !a.open;
			var d = a.open;
			console.log(d), c.text(d ? "Hide error details" : "Show error details"), b.classed("hidden", !d)
		}), b()
	}, n
}, microServeApp.pauseMenu = function(a) {
	function b() {
		c(), d()
	}

	function c() {
		e.classed("paused", function(a) {
			return a.paused
		})
	}

	function d() {
		e.text(e.datum().paused ? "Resume" : "Pause")
	}
	var e, f = {};
	return f.setup = function() {
		e = d3.select("#pause-button").datum({
			paused: !1
		}).on("click", function(c) {
			c.paused ? a.unfreeze() : a.freeze(), c.paused = !c.paused, b()
		}), b()
	}, f.reset = function() {
		e.datum().paused = !1, a.unfreeze(), b()
	}, f
}, microServeApp.resetMenu = function(a, b) {
    console.log("resetMenu");
    console.log(a);
    console.log(b);

	function c() {
		e.classDistance(f.classDistance()), e.datatypeDistance(f.datatypeDistance()), e.charge(f.charge()), e.gravity(f.gravity()), e.linkStrength(f.linkStrength()), a.reset(), b.forEach(function(a) {
			a.reset()
		}), a.updateStyle()
	}
	var d = {},
		e = a.graphOptions(),
		f = microServe.options();
	return d.setup = function() {
		d3.select("#reset-button").on("click", c)
	}, d
}, microServeApp.sidebar = function(a) {
	function b() {
		function a(a) {
			a.classed("hidden", !0)
		}

		function b(a) {
			a.classed("hidden", !1)
		}
		var c = d3.selectAll(".accordion-trigger");
		a(d3.selectAll(".accordion-trigger:not(.accordion-trigger-active) + div")), c.on("click", function() {
			var c = d3.select(this),
				d = d3.selectAll(".accordion-trigger-active");
			c.classed("accordion-trigger-active") ? (a(d3.select(c.node().nextElementSibling)), c.classed("accordion-trigger-active", !1)) : (a(d3.selectAll(".accordion-trigger-active + div")), d.classed("accordion-trigger-active", !1), b(d3.select(c.node().nextElementSibling)), c.classed("accordion-trigger-active", !0))
		})
	}

	function c(b) {
		b = b || [], b.sort(function(a, b) {
			return a === microServe.util.constants().LANG_IRIBASED ? -1 : b === microServe.util.constants().LANG_IRIBASED ? 1 : a === microServe.util.constants().LANG_UNDEFINED ? -1 : b === microServe.util.constants().LANG_UNDEFINED ? 1 : a.localeCompare(b)
		});
		var c = d3.select("#language").on("change", function() {
			a.setLanguage(d3.event.target.value), e(), w.updateSelectionInformation(v)
		});
		c.selectAll("option").remove(), c.selectAll("option").data(b).enter().append("option").attr("value", function(a) {
			return a
		}).text(function(a) {
			return a
		}), d(c, b, "en") || d(c, b, microServe.util.constants().LANG_UNDEFINED) || d(c, b, microServe.util.constants().LANG_IRIBASED)
	}

	function d(b, c, d) {
		var e = c.indexOf(d);
		return e >= 0 ? (b.property("selectedIndex", e), a.setLanguage(d), !0) : !1
	}

	function e() {
		var b = x.textForCurrentLanguage(u.title, a.getLanguage());
		d3.select("#title").text(b || "No title available"), d3.select("#about").attr("href", u.iri).attr("target", "_blank").text(u.iri), d3.select("#version").text(u.version || "--");
		var c = u.author;
		d3.select("#authors").text("string" == typeof c ? c : c instanceof Array ? c.join(", ") : "--");
		var d = x.textForCurrentLanguage(u.description, a.getLanguage());
		d3.select("#description").text(d || "No description available.")
	}

	function f(a, b) {
		a = a || {}, d3.select("#classCount").text(a.classCount || b.classCount()), d3.select("#objectPropertyCount").text(a.objectPropertyCount || b.objectPropertyCount()), d3.select("#datatypePropertyCount").text(a.datatypePropertyCount || b.datatypePropertyCount()), d3.select("#individualCount").text(a.totalIndividualCount || b.totalIndividualCount()), d3.select("#nodeCount").text(b.nodeCount()), d3.select("#edgeCount").text(b.edgeCount())
	}

	function g(a) {
		var b = d3.select("#ontology-metadata");
		b.selectAll("*").remove(), h(b, a), b.selectAll(".annotation").size() <= 0 && b.append("p").text("No annotations available.")
	}

	function h(a, b) {
		b = b || {};
		var c = [];
		for (var d in b) c.push(b[d][0]);
		a.selectAll(".annotation").remove(), a.selectAll(".annotation").data(c).enter().append("p").classed("annotation", !0).classed("statisticDetails", !0).text(function(a) {
			return a.identifier + ":"
		}).append("span").each(function(a) {
			n(d3.select(this), a.value, "iri" === a.type ? a.value : void 0)
		})
	}

	function i() {
		j(!1, !1, !0)
	}

	function j(a, b, c) {
		d3.select("#classSelectionInformation").classed("hidden", !a), d3.select("#propertySelectionInformation").classed("hidden", !b), d3.select("#noSelectionInformation").classed("hidden", !c)
	}

	function k(a) {
		l(), m(d3.select("#propname"), a.labelForCurrentLanguage(), a.iri()), d3.select("#typeProp").text(a.type()), void 0 !== a.inverse() ? (d3.select("#inverse").classed("hidden", !1), m(d3.select("#inverse span"), a.inverse().labelForCurrentLanguage(), a.inverse().iri())) : d3.select("#inverse").classed("hidden", !0);
		var b = d3.select("#propEquivUri");
		s(b, a.equivalents()), s(d3.select("#subproperties"), a.subproperties()), s(d3.select("#superproperties"), a.superproperties()), void 0 !== a.minCardinality() ? (d3.select("#infoCardinality").classed("hidden", !0), d3.select("#minCardinality").classed("hidden", !1), d3.select("#minCardinality span").text(a.minCardinality()), d3.select("#maxCardinality").classed("hidden", !1), d3.select("#maxCardinality span").text(void 0 !== a.maxCardinality() ? a.maxCardinality() : "*")) : void 0 !== a.cardinality() ? (d3.select("#minCardinality").classed("hidden", !0), d3.select("#maxCardinality").classed("hidden", !0), d3.select("#infoCardinality").classed("hidden", !1), d3.select("#infoCardinality span").text(a.cardinality())) : (d3.select("#infoCardinality").classed("hidden", !0), d3.select("#minCardinality").classed("hidden", !0), d3.select("#maxCardinality").classed("hidden", !0)), m(d3.select("#domain"), a.domain().labelForCurrentLanguage(), a.domain().iri()), m(d3.select("#range"), a.range().labelForCurrentLanguage(), a.range().iri()), o(a.attributes(), d3.select("#propAttributes")), t(d3.select("#propDescription"), a.descriptionForCurrentLanguage()), t(d3.select("#propComment"), a.commentForCurrentLanguage()), h(d3.select("#propertySelectionInformation"), a.annotations())
	}

	function l() {
		j(!1, !0, !1)
	}

	function m(a, b, c) {
		a.selectAll("*").remove(), n(a, b, c)
	}

	function n(a, b, c) {
		var d;
		d = c ? a.append("a").attr("href", c).attr("title", c).attr("target", "_blank") : a.append("span"), d.text(b)
	}

	function o(a, b) {
		var c = d3.select(b.node().parentNode);
		a && a.length > 0 && (p("object", a), p("datatype", a), p("rdf", a)), a && a.length > 0 ? (b.text(a.join(", ")), c.classed("hidden", !1)) : c.classed("hidden", !0)
	}

	function p(a, b) {
		var c = b.indexOf(a);
		c > -1 && b.splice(c, 1)
	}

	function q(a) {
		r(), m(d3.select("#name"), a.labelForCurrentLanguage(), a.iri());
		var b = d3.select("#classEquivUri");
		s(b, a.equivalents()), d3.select("#typeNode").text(a.type()), s(d3.select("#individuals"), a.individuals());
		var c = d3.select("#disjointNodes"),
			d = d3.select(c.node().parentNode);
		void 0 !== a.disjointWith() ? (c.selectAll("*").remove(), a.disjointWith().forEach(function(a, b) {
			b > 0 && c.append("span").text(", "), n(c, a.labelForCurrentLanguage(), a.iri())
		}), d.classed("hidden", !1)) : d.classed("hidden", !0), o(a.attributes(), d3.select("#classAttributes")), t(d3.select("#nodeDescription"), a.descriptionForCurrentLanguage()), t(d3.select("#nodeComment"), a.commentForCurrentLanguage()), h(d3.select("#classSelectionInformation"), a.annotations())
	}

	function r() {
		j(!0, !1, !1)
	}

	function s(a, b) {
		var c = d3.select(a.node().parentNode);
		b && b.length ? (a.selectAll("*").remove(), b.forEach(function(b, c) {
			c > 0 && a.append("span").text(", "), n(a, b.labelForCurrentLanguage(), b.iri())
		}), c.classed("hidden", !1)) : c.classed("hidden", !0)
	}

	function t(a, b) {
		var c = d3.select(a.node().parentNode),
			d = !!b;
		b && a.text(b), c.classed("hidden", !d)
	}
	var u, v, w = {},
		x = microServe.util.languageTools();
	return w.setup = function() {
		b()
	}, w.updateOntologyInformation = function(a, b) {
		a = a || {}, u = a.header || {}, e(), f(a.metrics, b), g(u.other), w.updateSelectionInformation(void 0), c(u.languages)
	}, w.updateSelectionInformation = function(a) {
		if (v = a, !d3.event || !d3.event.defaultPrevented) {
			var b = d3.select("#selection-details-trigger").classed("accordion-trigger-active");
			if (a && !b) d3.select("#selection-details-trigger").node().click();
			else if (!a && b) return void i();
			a instanceof microServe.labels.BaseLabel ? k(a) : a instanceof microServe.nodes.BaseNode && q(a)
		}
	}, w
};
//# sourceMappingURL=microServe-app.min.js.map