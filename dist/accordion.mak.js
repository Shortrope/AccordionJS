/*jslint white: true*/
(function () {

    'use strict';

    /* VARiables 
    =============================================== */
    var aSources,
        aTargetIds,
        aTargetHeights,
        i;


    /* FUNCTIONS 
    =============================================== */

    /* @return array of strings */
    function getTargetIds(srcs) {
        var targs = [];
        for (i = 0; i < srcs.length; i += 1) {
            targs.push(srcs[i].getAttribute('data-accordion-target'));
        }
        return targs;
    }

    /* Creates an array of target heights to be used for the transition
     * of each individual target. The heights are collected before they
     * are set to zero
      @param targetIds:array
      @return array
     */
    function getTargetHeights(targetIds) {
        var heights = [],
            elem;
        for (i = 0; i < targetIds.length; i += 1) {
            elem = document.getElementById(targetIds[i]);
            heights.push(elem.clientHeight);
        }
        return heights;
    }

    /* Sets the target element height to zero 
     * @param targetId:string
     */
    function zeroHeight(targetId) {
        document.getElementById(targetId).style.height = '0';
    }

    /* Adds a 'click' listener to a Source element
     * @param aSrc:object - source element
     * @param tId:string - target Id
     * @param tHeight:string - target height
     * @param singleOpen:boolean - if true, only one target open at a time
     *                           - if false, each click is a toggle for that element
     */
    function addAccordionListener(aSrc, tId, tHeight, singleOpen) {
        aSrc.addEventListener('click', function (e) {
            if (singleOpen) {
                // close all elements
                for (i = 0; i < aTargetIds.length; i += 1) {
                    document.getElementById(aTargetIds[i]).style.height = '0';
                }
            }
            var theTarget = document.getElementById(tId);
            // if toggle open / closed state
            if (theTarget.clientHeight === 0) {
                theTarget.style.height = tHeight + 'px';
            } else {
                theTarget.style.height = '0';
            }
        });
    }


    /* APPLICATION 
    =============================================== */

    // get array of accordion source elements
    aSources = document.querySelectorAll('[data-accordion-target]');

    // get the accordion target ids from the sources
    aTargetIds = getTargetIds(aSources);

    // Get the height of each of the targets.
    aTargetHeights = getTargetHeights(aTargetIds);

    // Set height of all targets to zero
    for (i = 0; i < aTargetIds.length; i += 1) {
        zeroHeight(aTargetIds[i]);
    }


    // add click eventListener to each Source element
    for (i = 0; i < aSources.length; i += 1) {
        addAccordionListener(aSources[i], aTargetIds[i], aTargetHeights[i], true);
    }

}());