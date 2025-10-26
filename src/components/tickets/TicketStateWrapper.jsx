    // src/components/tickets/TicketStateWrapper.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useTickets } from '../../hooks/useTickets'; // 🎯 Your existing hook

// 1. Context Object
const TicketContext = createContext(null);

// 2. Custom Hook to consume the context
export const useTicketData = () => {
    const context = useContext(TicketContext);
    if (context === null) {
        throw new Error('useTicketData must be used within a TicketStateWrapper');
    }
    return context;
};

// 3. Provider Component
export const TicketStateWrapper = ({ children }) => {
    // 🎯 Run the heavy lifting here! The useTickets hook starts fetching immediately.
    const ticketData = useTickets(); 
    
    // We add an effect to manually trigger the initial fetch since your hook structure
    // doesn't rely on being mounted inside a Provider's useEffect.
    useEffect(() => {
        ticketData.fetchTickets();
        // NOTE: We only fetch once on mount of the wrapper.
    }, []); 

    return (
        <TicketContext.Provider value={ticketData}>
            {children}
        </TicketContext.Provider>
    );
};