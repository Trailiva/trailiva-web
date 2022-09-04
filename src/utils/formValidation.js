export const registrationOption = {
  fullName: {
    required: "Name is required",
    minLength: {
      value: 3,
      message: "Name must have at least 3 characters",
    },
    maxLength: {
      value: 20,
      message: "Name cannot be greater than 20 characters",
    },
    pattern: {
      value: /^[A-Z][a-z]+\s[A-Z][a-z]+$/i,
      message: "Full name is required"
    }
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Valid email address is required",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must have at least 6 characters",
    },
    maxLength: {
      value: 20,
      message: "Password cannot be greater than 20 characters",
    },
  },
  workspace_title: {
    required: "Workspace title is required",
    minLength: {
      value: 3,
      message: "Workspace must have at least 3 characters",
    },
    maxLength: {
      value: 20,
      message: "Workspace cannot be greater than 20 characters",
    },
  },
  task_name: {
    required: "Task name is required",
    minLength: {
      value: 5,
      message: "Task must have at least 5 characters",
    },
    maxLength: {
      value: 100,
      message: "Task cannot be greater than 100 characters",
    },
  },
  text_field: {
    required: "Text is required",
    minLength: {
      value: 10,
      message: "Text must have at least 10 characters",
    },
    maxLength: {
      value: 100,
      message: "Text cannot be greater than 100 characters",
    },
  },
};
