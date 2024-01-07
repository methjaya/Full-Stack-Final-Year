
export const workoutDetails = (token) => {
  return fetch('http://localhost:8080/workout/details', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const userWorkoutDetails = (token, uid) => {
  return fetch('http://localhost:8080/workout/user-workouts', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(uid)
  });
};

export const register = (userData) => {
  return fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

export const getUsers = (token) => {
  return fetch("http://localhost:8080/admin/users/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
  });
};

export const login = (userData) => {
  return fetch("http://localhost:8080/auth/login", {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

export const setCardio = (cardioData, token) => {
  return fetch("http://localhost:8080/workout/cardio/set", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardioData)
  })
}

export const setTrack = (cardioData, token) => {
  return fetch("http://localhost:8080/workout/track/set", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardioData)
  })
}

export const setAbs = (cardioData, token) => {
  return fetch("http://localhost:8080/workout/abs/set", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardioData)
  })
}

export const setStrength = (workoutData, token) => {
  return fetch("http://localhost:8080/workout/strength/set", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(workoutData)
  })
}

export const deleteWorkout = (workoutData, token) => {
  return fetch("http://localhost:8080/workout/delete", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(workoutData)
  })
}



