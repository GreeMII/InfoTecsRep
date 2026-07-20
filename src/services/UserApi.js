const API_URL = 'https://dummyjson.com/users'

export const UserApi = {
    async getAllUsers() {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                if (response.status === 404) {
                    console.log("Страница не найдена");
                }
                if (response.status === 500) {
                    console.log("Внутренняя ошибка сервера");
                }
                throw new Error(`Ошибка: ${response.status}`);
            }

            const data = await response.json();
            console.log('Загружено пользователей:', data.users?.length);
            return data;
        } catch (error) {
            console.error('Ошибка при загрузке:', error);
            throw error;
        }
    }
};