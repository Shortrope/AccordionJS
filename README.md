#Accordion.mak.js

This JavaScript accordion is designed to allow any element be a source link to a target accordion element. You are also not restricted to a specific container.

Source element must contain 'data-accordion-target' attribute:
data-accordion-target="<id-of-target-element>" 

The target element must have an 'id' that matches the 'data-accordion-target' value from the source link.

The target element must also have this class:
class="accordion-target"

```html
<p data-accordion-target="aTarget-1">Source element 1</p>
<div id="aTarget-1" class="accordion-target">
	<p>A bunch of whaterver</p>
</div>

<h3 data-accordion-target="aTarget-2">Source element 2</h3>
<p id="aTarget-2" class="accordion-target">
	A bunch more of  whaterver
</p>
```


The transition time can be set in the accordion.mak.css file which has one selector w two properties:

```css
.accordion-target { 
    overflow: hidden;
    transition:height 0.5s;
}
```



