// Blazor Interop file
(function() {
    // We'll use this object to store references to Blazor components
    window.blazorReferences = {
        home: null
    };
    
    // Register a Blazor component reference
    window.registerBlazorComponent = function(name, dotNetReference) {
        console.log(`Registering Blazor component: ${name}`);
        window.blazorReferences[name] = dotNetReference;
    };
    
    // Update the current section in the Blazor component
    window.updateBlazorComponent = function(sectionIndex) {
        console.log(`Updating Blazor component with section: ${sectionIndex}`);
        try {
            if (window.blazorReferences.home) {
                window.blazorReferences.home.invokeMethodAsync('UpdateCurrentSection', sectionIndex);
            }
        } catch (error) {
            console.error("Error updating Blazor component:", error);
        }
    };
    
    // Check if all required resources are loaded
    window.checkResourcesLoaded = function() {
        return {
            horizontalLandingJS: typeof window.scrollToSection === 'function',
            blazorInteropJS: typeof window.registerBlazorComponent === 'function'
        };
    };
})(); 