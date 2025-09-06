
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';

const ProfilePage: React.FC = () => {
    const { currentUser, updateUser } = useAppContext();
    const [username, setUsername] = useState(currentUser?.username || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [isEditing, setIsEditing] = useState(false);

    if (!currentUser) {
        return <Layout><div>Please log in to view your profile.</div></Layout>;
    }
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({ ...currentUser, username, email });
        setIsEditing(false);
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
                    <img src={currentUser.profilePicture} alt="Profile" className="w-32 h-32 rounded-full border-4 border-accent object-cover mb-4 sm:mb-0" />
                    <div className="flex-grow text-center sm:text-left">
                        <h1 className="text-3xl font-bold text-textDark mb-4">My Profile</h1>
                        {!isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Username</label>
                                    <p className="text-lg text-textDark">{currentUser.username}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Email</label>
                                    <p className="text-lg text-textDark">{currentUser.email}</p>
                                </div>
                                <button onClick={() => setIsEditing(true)} className="mt-4 px-6 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-primary transition-colors">
                                    Edit Profile
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                                </div>
                                <div className="flex space-x-2">
                                    <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors">
                                        Save Changes
                                    </button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage;
