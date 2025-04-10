import React, { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    bio: 'Sinh viên ngành Công nghệ thông tin, yêu thích học React và Node.js.',
    website: 'https://nguyenvana.com',
    avatar: 'https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'
  });

  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser({ ...user, avatar });
    setEditing(false);
    alert('Cập nhật thông tin thành công!');
  };

  return (
    <div className="max-w-full mx-auto mt-10 mb-10 px-[1rem] sm:px-[2rem] lg:px-[4rem] h-w-[100vh]  ">
      <div 
        className="max-w-full bg-white rounded-lg p-6 flex space-x-6 border"
        style={{ 
            minHeight: '400px',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
         }} 
    >
        <div className="flex-shrink-0">
          <img
            src={avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
          />
          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-2"
            />
          )}
        </div>

        <div className="flex-grow space-y-4">
          <h2 className="text-2xl font-bold">Personal profile</h2>

          <div className="space-y-1">
            <label className="block font-rubik font-medium">User Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded-md px-3 py-2 ${!editing ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>

          <div className="space-y-1">
            <label className="block font-rubik font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded-md px-3 py-2 ${!editing ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>

          <div className="space-y-1">
            <label className="block font-rubik font-medium">Website</label>
            <input
              type="url"
              name="website"
              value={user.website}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded-md px-3 py-2 ${!editing ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>

          <div className="space-y-1">
            <label className="block font-rubik font-medium">Bio</label>
            <textarea
              name="bio"
              rows="4"
              value={user.bio}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded-md px-3 py-2 resize-none ${!editing ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>

          <div className="flex justify-end gap-3">
            {editing ? (
              <>
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  onClick={() => setEditing(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Lưu
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setEditing(true)}
                >
                  Chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfile;