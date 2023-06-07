import React, { createContext, useState } from 'react'

export const ContextActions = createContext(null);


// Purpose of this Context is to manage all page actions like (hide categories)
// Mainly used in navbars 
function ActionsContext(props) {

    // Show or hide categories panel in home page 
    const [showCategories, setShowCategories] = useState(true)

    return (
        <ContextActions.Provider value={{ showCategories, setShowCategories }}>
            {props.children}
        </ContextActions.Provider>
    )
}

export default ActionsContext