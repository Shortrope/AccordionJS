/*jslint vars: true*/
/*
 * This is an example of the object used to store target
 * data: target ids, their sources, and the initial height.
 * Each target can have multiple sources
 *
 * { 
 *   targId1: {
 *               sources: [elem, elem,..],
 *               height: 84
 *             },
 *   targId2: {
 *               sources: [elem, elem,..],
 *               height: 84
 *             },
 *   ...
 * }   
 *
 */

(function () {
    'use strict';

    /* VARiables 
    =============================================== */
    var singleOpen = true, // single or multiple items open at same time
        icons = true, // show +/- icons
        aSources, // array of source elements
        aTargetIds = {}; // object that stores target info


    /* FUNCTIONS 
    =============================================== */

    /* populate aTargetIds object w sources  */
    function getTargetIds() {
        var targetId, i;
        for (i = 0; i < aSources.length; i += 1) {
            targetId = aSources[i].getAttribute('data-accordion-target');
            if (aTargetIds.hasOwnProperty(targetId)) {
                aTargetIds[targetId].sources.push(aSources[i]);
            } else {
                aTargetIds[targetId] = {
                    sources: [aSources[i]]
                };
            }
        }
    }

    /* populate the 'height' property for each target in the
     * aTargets object
     */
    function getTargetHeights() {
        var tId, elem;
        for (tId in aTargetIds) {
            if (aTargetIds.hasOwnProperty(tId)) {
                elem = document.getElementById(tId);
                aTargetIds[tId].height = elem.clientHeight;
            }
        }
    }

    /* Sets the target element height to zero 
     * param: targetId (string)
     */
    function zeroHeight(targetId) {
        document.getElementById(targetId).style.height = '0';
    }

    /* Sets all target element heights to zero */
    function zeroAllElementHeights() {
        var tId, i;
        for (tId in aTargetIds) {
            if (aTargetIds.hasOwnProperty(tId)) {
                zeroHeight(tId);
                if (icons) {
                    for (i = 0; i < aTargetIds[tId].sources.length; i += 1) {
                        aTargetIds[tId].sources[i].classList.remove('accordion-open');
                        aTargetIds[tId].sources[i].classList.add('accordion-closed');
                    }
                }
            }
        }
    }

    /* The Event Handler*/
    function accordionAction(e) {
        var src = e.target;
        var tId = e.target.getAttribute('data-accordion-target');
        var theTarget = document.getElementById(tId);
        var prop, i;

        if (singleOpen) {
            // make sure all sources are closed
            zeroAllElementHeights();
            // and all sources have a class of 'accordion-closed'
            for (prop in aTargetIds) {
                if (aTargetIds.hasOwnProperty(prop)) {
                    if (icons) {
                        for (i = 0; i < aTargetIds[prop].sources.length; i += 1) {
                            aTargetIds[prop].sources[i].classList.remove('accordion-open');
                            aTargetIds[prop].sources[i].classList.add('accordion-closed');
                        }
                    }
                }
            }
        }
        // toggle open/closed state
        if (theTarget.clientHeight === 0) {
            // open target element
            theTarget.style.height = aTargetIds[tId].height + 'px';
            // change source(s) icon
            if (icons) {
                for (i = 0; i < aTargetIds[tId].sources.length; i += 1) {
                    aTargetIds[tId].sources[i].classList.remove('accordion-closed');
                    aTargetIds[tId].sources[i].classList.add('accordion-open');
                }
            }
        } else {
            theTarget.style.height = '0';
            if (icons) {
                for (i = 0; i < aTargetIds[tId].sources.length; i += 1) {
                    aTargetIds[tId].sources[i].classList.remove('accordion-open');
                    aTargetIds[tId].sources[i].classList.add('accordion-closed');
                }
            }
        }
    }

    /* Adds a 'click' listener to all Source elements */
    function addListenersToSources() {
        var srcs, tId, i;
        for (tId in aTargetIds) {
            if (aTargetIds.hasOwnProperty(tId)) {
                srcs = aTargetIds[tId].sources;
                for (i = 0; i < srcs.length; i += 1) {
                    srcs[i].addEventListener('click', accordionAction);
                }
            }
        }
    }


    /* APPLICATION 
    =============================================== */

    // get array of accordion source elements
    aSources = document.querySelectorAll('[data-accordion-target]');

    // get the accordion target ids from the sources
    getTargetIds();

    // Get the height of each of the targets.
    getTargetHeights();

    // Set height of all targets to zero
    zeroAllElementHeights();

    // add click eventListener to each Source element
    addListenersToSources();

}());