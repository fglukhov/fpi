/*! jQuery SVG to Inline v0.1.4
 *   https://github.com/tiagoporto/jquery-svg-to-inline
 *   Copyright (c) 2016-2017 Tiago Porto (tiagoporto.com)
 *   Released under the MIT license
 */
"use strict";
$.fn.svgToInline = function (s) {
	var a = {
		"class": this.selector.replace(".", ""),
		useClass: s && s.useTriggerClass || !1
	};
	this.each(function () {
		var s = {
				currency: $(this),
				oldClass: "",
				newClass: "",
				path: $(this).attr("data") || $(this).attr("src")
			},
			e = {
				element: "",
				svgTag: "",
				svgTagWithoutClass: ""
			},
			l = $(this).attr("class").split(" "),
			t = l.length;
		if (t > 0)
			for (var g = 0; g < t; ++g) {
				var n = "";
				(l[g] !== a["class"] || a.useClass) && (g !== l.length - 1 && (n = " "), l[g] && (s.newClass += l[g] + n))
			}
		$.ajax({
			url: s.path,
			dataType: "text",
			success: function (a) {
				e.element = a.replace(/<[?!][\s\w\"-\/:=?]+>/g, ""), e.svgTag = e.element.match(/<svg[\w\s\t\n:="\\'\/.#-]+>/g), e.svgTagWithoutClass = e.svgTag[0].replace(/class=\"[\w\s-_]+\"/, ""), s.oldClass = e.svgTag[0].match(/class=\"(.*?)\"/), s.oldClass && s.oldClass[1] && s.newClass && (s.newClass = s.oldClass[1] + " " + s.newClass), "" !== s.newClass && (s.newClass = 'class="' + s.newClass + '"'), e.svgTagWithoutClass = e.svgTagWithoutClass.replace(">", " " + s.newClass + ">"), s.currency.replaceWith(e.element.replace(/<svg[\w\s\t\n:="\\'\/.#-]+>/g, e.svgTagWithoutClass))
			}
		})
	})
};