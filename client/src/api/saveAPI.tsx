const saveDestination = async (destination: Location): Promise<void> => {

    try {
        const response = await fetch('/saved', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(destination),
        });
        if (!response.ok) {
            throw new Error('Failed to save destination');
        }
        const savedDestination: Location = await response.json();
        console.log('Destination saved:', savedDestination);
    } catch (error) {
        console.error('Error saving destination:', error);
    }
};

export { saveDestination };