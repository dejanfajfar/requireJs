# requireJs #

RequireJS is a simple java script library that enables you to manage scrip file dependencies in a more natural way.

## The problem... ##

The way we do it now is that the actual html page using the java script functionality has to make sure that all the parts are there when the desired "function" executes. 

    <html>
		<head>
			<script type="text/javascript" src="RequirementA.js"/>
			<script type="text/javascript" src="RequirementB.js"/>
			<script type="text/javascript" src="Page.js"/>
		</head>
	</html>

This is my point. Me writing this has to know that I need **RequirementA** and **RequirementB** to use some function in **Page.js**. Why does the html have to know this.

## The solution?? ##

I do not like to rely on the html to load up my javascript environment correctly. I like to let the java script state what it needs. 

	<script type="text/javascript">
		register('RequirementA', '/Scripts/RequirementA.js');
		register('RequirementB', '/Scripts/RequirementA.js');
		
		// Some JS script not depended on the two JS files

		load('RequirementA');
		
		// now you can use any functions defined in **RequirementA.js**
	</script>

This way you can add od remove dependencies from your page specific JS file without having to change the underlying *HTML* file.