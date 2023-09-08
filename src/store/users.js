import usersData from '@/store/users.json';

export default {
    login(username, password) {
        const user = usersData.find(user => user.username === username && user.password === password);

        if (user) {
            return { success: true, role: user.role };
        } else {
            return { success: false, message: 'Wrong username or password.' };
        }
    }
};
