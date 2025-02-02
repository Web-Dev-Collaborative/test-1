(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.tokenizer = f();
  }
})(function () {
  var define, module, exports;
  return (function () {
    function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a) return a(o, !0);
            if (i) return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw ((f.code = "MODULE_NOT_FOUND"), f);
          }
          var l = (n[o] = { exports: {} });
          t[o][0].call(
            l.exports,
            function (e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            },
            l,
            l.exports,
            e,
            t,
            n,
            r
          );
        }
        return n[o].exports;
      }
      var i = typeof require == "function" && require;
      for (var o = 0; o < r.length; o++) s(r[o]);
      return s;
    }
    return e;
  })()(
    {
      1: [
        function (require, module, exports) {
          var abbreviations;
          var englishAbbreviations = [
            "al",
            "adj",
            "assn",
            "Ave",
            "BSc",
            "MSc",
            "Cell",
            "Ch",
            "Co",
            "cc",
            "Corp",
            "Dem",
            "Dept",
            "ed",
            "eg",
            "Eq",
            "Eqs",
            "est",
            "est",
            "etc",
            "Ex",
            "ext",
            "Fig",
            "fig",
            "Figs",
            "figs",
            "i.e",
            "ie",
            "Inc",
            "inc",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
            "jr",
            "mi",
            "Miss",
            "Mrs",
            "Mr",
            "Ms",
            "Mol",
            "mt",
            "mts",
            "no",
            "Nos",
            "PhD",
            "MD",
            "BA",
            "MA",
            "MM",
            "pl",
            "pop",
            "pp",
            "Prof",
            "Dr",
            "pt",
            "Ref",
            "Refs",
            "Rep",
            "repr",
            "rev",
            "Sec",
            "Secs",
            "Sgt",
            "Col",
            "Gen",
            "Rep",
            "Sen",
            "Gov",
            "Lt",
            "Maj",
            "Capt",
            "St",
            "Sr",
            "sr",
            "Jr",
            "jr",
            "Rev",
            "Sun",
            "Mon",
            "Tu",
            "Tue",
            "Tues",
            "Wed",
            "Th",
            "Thu",
            "Thur",
            "Thurs",
            "Fri",
            "Sat",
            "trans",
            "Univ",
            "Viz",
            "Vol",
            "vs",
            "v",
          ];
          exports.setAbbreviations = function (abbr) {
            if (abbr) {
              abbreviations = abbr;
            } else {
              abbreviations = englishAbbreviations;
            }
          };
          var isCapitalized = (exports.isCapitalized = function (str) {
            return /^[A-Z][a-z].*/.test(str) || isNumber(str);
          });
          exports.isSentenceStarter = function (str) {
            return isCapitalized(str) || /``|"|'/.test(str.substring(0, 2));
          };
          exports.isCommonAbbreviation = function (str) {
            return ~abbreviations.indexOf(str.replace(/\W+/g, ""));
          };
          exports.isTimeAbbreviation = function (word, next) {
            if (word === "a.m." || word === "p.m.") {
              var tmp = next.replace(/\W+/g, "").slice(-3).toLowerCase();
              if (tmp === "day") {
                return true;
              }
            }
            return false;
          };
          exports.isDottedAbbreviation = function (word) {
            var matches = word.replace(/[\(\)\[\]\{\}]/g, "").match(/(.\.)*/);
            return matches && matches[0].length > 0;
          };
          exports.isCustomAbbreviation = function (str) {
            if (str.length <= 3) {
              return true;
            }
            return isCapitalized(str);
          };
          exports.isNameAbbreviation = function (wordCount, words) {
            if (words.length > 0) {
              if (
                wordCount < 5 &&
                words[0].length < 6 &&
                isCapitalized(words[0])
              ) {
                return true;
              }
              var capitalized = words.filter(function (str) {
                return /[A-Z]/.test(str.charAt(0));
              });
              return capitalized.length >= 3;
            }
            return false;
          };
          var isNumber = (exports.isNumber = function (str, dotPos) {
            if (dotPos) {
              str = str.slice(dotPos - 1, dotPos + 2);
            }
            return !isNaN(str);
          });
          exports.isPhoneNr = function (str) {
            return str.match(
              /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
            );
          };
          exports.isURL = function (str) {
            return str.match(
              /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
            );
          };
          exports.isConcatenated = function (word) {
            var i = 0;
            if (
              (i = word.indexOf(".")) > -1 ||
              (i = word.indexOf("!")) > -1 ||
              (i = word.indexOf("?")) > -1
            ) {
              var c = word.charAt(i + 1);
              if (c.match(/[a-zA-Z].*/)) {
                return [word.slice(0, i), word.slice(i + 1)];
              }
            }
            return false;
          };
          exports.isBoundaryChar = function (word) {
            return word === "." || word === "!" || word === "?";
          };
        },
        {},
      ],
      2: [
        function (require, module, exports) {
          module.exports = function sanitizeHtml(text, opts) {
            if (
              (typeof text == "string" || text instanceof String) &&
              typeof document !== "undefined"
            ) {
              var $div = document.createElement("DIV");
              $div.innerHTML = text;
              text = ($div.textContent || "").trim();
            } else if (typeof text === "object" && text.textContent) {
              text = (text.textContent || "").trim();
            }
            return text;
          };
        },
        {},
      ],
      3: [
        function (require, module, exports) {
          exports.endsWithChar = function ends_with_char(word, c) {
            if (c.length > 1) {
              return c.indexOf(word.slice(-1)) > -1;
            }
            return word.slice(-1) === c;
          };
          exports.endsWith = function ends_with(word, end) {
            return word.slice(word.length - end.length) === end;
          };
        },
        {},
      ],
      4: [
        function (require, module, exports) {
          "use strict";
          var sanitizeHtml = require("sanitize-html");
          var stringHelper = require("./stringHelper");
          var Match = require("./Match");
          var newline_placeholder = " @~@ ";
          var newline_placeholder_t = newline_placeholder.trim();
          var whiteSpaceCheck = new RegExp("\\S", "");
          var addNewLineBoundaries = new RegExp("\\n+|[-#=_+*]{4,}", "g");
          var splitIntoWords = new RegExp("\\S+|\\n", "g");
          exports.sentences = function (text, user_options) {
            if (!text || typeof text !== "string" || !text.length) {
              return [];
            }
            if (!whiteSpaceCheck.test(text)) {
              return [];
            }
            var options = {
              newline_boundaries: false,
              html_boundaries: false,
              html_boundaries_tags: ["p", "div", "ul", "ol"],
              sanitize: false,
              allowed_tags: false,
              preserve_whitespace: false,
              abbreviations: null,
            };
            if (typeof user_options === "boolean") {
              options.newline_boundaries = true;
            } else {
              for (var k in user_options) {
                options[k] = user_options[k];
              }
            }
            Match.setAbbreviations(options.abbreviations);
            if (options.newline_boundaries) {
              text = text.replace(addNewLineBoundaries, newline_placeholder);
            }
            if (options.html_boundaries) {
              var html_boundaries_regexp =
                "(<br\\s*\\/?>|<\\/(" +
                options.html_boundaries_tags.join("|") +
                ")>)";
              var re = new RegExp(html_boundaries_regexp, "g");
              text = text.replace(re, "$1" + newline_placeholder);
            }
            if (options.sanitize || options.allowed_tags) {
              if (!options.allowed_tags) {
                options.allowed_tags = [""];
              }
              text = sanitizeHtml(text, { allowedTags: options.allowed_tags });
            }
            var words;
            var tokens;
            if (options.preserve_whitespace) {
              tokens = text.split(/(<br\s*\/?>|\S+|\n+)/);
              words = tokens.filter(function (token, ii) {
                return ii % 2;
              });
            } else {
              words = text.trim().match(splitIntoWords);
            }
            var wordCount = 0;
            var index = 0;
            var temp = [];
            var sentences = [];
            var current = [];
            if (!words || !words.length) {
              return [];
            }
            for (var i = 0, L = words.length; i < L; i++) {
              wordCount++;
              current.push(words[i]);
              if (~words[i].indexOf(",")) {
                wordCount = 0;
              }
              if (
                Match.isBoundaryChar(words[i]) ||
                stringHelper.endsWithChar(words[i], "?!") ||
                words[i] === newline_placeholder_t
              ) {
                if (
                  (options.newline_boundaries || options.html_boundaries) &&
                  words[i] === newline_placeholder_t
                ) {
                  current.pop();
                }
                sentences.push(current);
                wordCount = 0;
                current = [];
                continue;
              }
              if (
                stringHelper.endsWithChar(words[i], '"') ||
                stringHelper.endsWithChar(words[i], "”")
              ) {
                words[i] = words[i].slice(0, -1);
              }
              if (stringHelper.endsWithChar(words[i], ".")) {
                if (i + 1 < L) {
                  if (words[i].length === 2 && isNaN(words[i].charAt(0))) {
                    continue;
                  }
                  if (Match.isCommonAbbreviation(words[i])) {
                    continue;
                  }
                  if (Match.isSentenceStarter(words[i + 1])) {
                    if (Match.isTimeAbbreviation(words[i], words[i + 1])) {
                      continue;
                    }
                    if (
                      Match.isNameAbbreviation(wordCount, words.slice(i, 6))
                    ) {
                      continue;
                    }
                    if (Match.isNumber(words[i + 1])) {
                      if (Match.isCustomAbbreviation(words[i])) {
                        continue;
                      }
                    }
                  } else {
                    if (stringHelper.endsWith(words[i], "..")) {
                      continue;
                    }
                    if (Match.isDottedAbbreviation(words[i])) {
                      continue;
                    }
                    if (
                      Match.isNameAbbreviation(wordCount, words.slice(i, 5))
                    ) {
                      continue;
                    }
                  }
                }
                sentences.push(current);
                current = [];
                wordCount = 0;
                continue;
              }
              if ((index = words[i].indexOf(".")) > -1) {
                if (Match.isNumber(words[i], index)) {
                  continue;
                }
                if (Match.isDottedAbbreviation(words[i])) {
                  continue;
                }
                if (Match.isURL(words[i]) || Match.isPhoneNr(words[i])) {
                  continue;
                }
              }
              if ((temp = Match.isConcatenated(words[i]))) {
                current.pop();
                current.push(temp[0]);
                sentences.push(current);
                current = [];
                wordCount = 0;
                current.push(temp[1]);
              }
            }
            if (current.length) {
              sentences.push(current);
            }
            sentences = sentences.filter(function (s) {
              return s.length > 0;
            });
            var result = sentences.slice(1).reduce(
              function (out, sentence) {
                var lastSentence = out[out.length - 1];
                if (
                  lastSentence.length === 1 &&
                  /^.{1,2}[.]$/.test(lastSentence[0])
                ) {
                  if (!/[.]/.test(sentence[0])) {
                    out.pop();
                    out.push(lastSentence.concat(sentence));
                    return out;
                  }
                }
                out.push(sentence);
                return out;
              },
              [sentences[0]]
            );
            return result.map(function (sentence, ii) {
              if (
                options.preserve_whitespace &&
                !options.newline_boundaries &&
                !options.html_boundaries
              ) {
                var tokenCount = sentence.length * 2;
                if (ii === 0) {
                  tokenCount += 1;
                }
                return tokens.splice(0, tokenCount).join("");
              }
              return sentence.join(" ");
            });
          };
        },
        { "./Match": 1, "./stringHelper": 3, "sanitize-html": 2 },
      ],
    },
    {},
    [4]
  )(4);
});
