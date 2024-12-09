$(document).ready(function() { 

    //jQuery function making sure it only runs after the HTML document has been loaded and parsed.

    // Initialize tooltip for images
    $("a img").tooltip({
        items: "img", // Specify that tooltips are for images
        content: function() {
            return $(this).attr("alt"); // Use the alt text of the image as tooltip content
        },

        //This defines how the tooltip will appear (the "show" effect). The tooltip will slide down when it is triggered.
        // When the tooltip is shown, it will slide down from a hidden position.
        // Specifies how long the sliding effect will last in milliseconds, 300 millisecond. 

        show: { effect: "slideDown", duration: 300 },

        //This defines how the tooltip will disapper when it is no longer being interacted with, causing a slide up animation to hide itself.
        //When users stop hovering over images the tooltip will slide up and hide.
        //Slide up effect will last for 200 millisecond to have a slightly faster exit animation than the original slide down for a more dynamic feel.

        hide: { effect: "slideUp", duration: 200 },
        position: { my: "center bottom", at: "center top-10" }
    });
});