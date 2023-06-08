import React, { createContext, useState } from 'react'

export const ContextActions = createContext(null);


// Purpose of this Context is to manage all page actions like (hide categories)
// Mainly used in navbars 
function ActionsContext(props) {

    // Show or hide Side panels in home page 
    const [showSidePanels, setShowSidePanels] = useState(true)

    return (
        <ContextActions.Provider value={{ showSidePanels, setShowSidePanels }}>
            {props.children}
        </ContextActions.Provider>
    )
}

export default ActionsContext