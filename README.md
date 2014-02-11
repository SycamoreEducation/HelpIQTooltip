HelpIQ Tooltip (Bootstrap 2.3.3 Compatible)
=============

Our product uses Bootstrap 2.3.3. and we were having some issues utilizing HelpIQ's embeddable tooltips on one of our pages. Upon further debugging, we found that a simple CSS change was needed in the HelpIQ javascript file.

The default bootstrap.css declared `.tooltip` to have `opacity: 0`. This is because bootstrap wants to control when the tooltip is dispalyed with their javascript file. HelpIQ uses the same class name ('.tooltip') but doesn't set an opacty value. To override this conflict, we simply added a property declaration for the `.tooltip` class in the top of the HelpIQ tooltip.js file. This should work as long as you're not using both HelpIQ and Bootstrap tooltips in the same page. 
