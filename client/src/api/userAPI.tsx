import Auth from '../utils/auth'; // Import the authentication utility for managing tokens

// Function to fetch a list of users by sending a GET request to '/api/users'
const retrieveUsers = async () => {
  try {
    // Make the request, including the authentication token in the headers
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json', // Specify the request format
        Authorization: `Bearer ${Auth.getToken()}` // Include the token for authorization
      }
    });

    // Parse the JSON response from the server
    const data = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Invalid response from the user API.'); // Throw an error if the request failed
    }

    // Return the list of users
    return data;
  } catch (err) {
    console.log('Error retrieving users:', err); // Log any errors during the request
    return []; // Return an empty array if there's an error
  }
}
// Function to delete a user by sending a DELETE request to the back-end
export const deleteUser = async (token: string) => {
  try {
    // Make an API call to the back-end route that deletes the user
    const response = await fetch('/api/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Specify the request format
        Authorization: `Bearer ${token}`, // Include the token for authorization
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    // Parse the JSON response from the server
    return await response.json();
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};

export { retrieveUsers };