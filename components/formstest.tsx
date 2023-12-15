import React, { useState, useEffect } from 'react';

interface UserFormProps {
  initialUser: { firstName: string; lastName: string };
  onSubmit: (updatedUser: { firstName: string; lastName: string }) => void;
}

const UserForm = ({ initialUser, onSubmit }:UserFormProps) => {
  const [user, setUser] = useState(initialUser);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setUser(initialUser);
    setIsDirty(false);
  }, [initialUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDirty) {
      onSubmit(user);
      setIsDirty(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};