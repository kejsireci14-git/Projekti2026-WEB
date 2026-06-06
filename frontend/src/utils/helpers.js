export const mapAuthResponse = (result) => ({
  user: {
    _id: result.id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    role: result.role,
  },
  token: result.token,
});

export const toList = (data) => (Array.isArray(data) ? data : []);
