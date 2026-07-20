const API_URL = 'https://api.allorigins.win/raw?url=https://dummyjson.com/users';

// CLASS for handling Api Errors
export class ApiError extends Error {
    constructor(message,status,data = null) {
        super(message);
        this.status = status;
        this.data = data;
        this.timestamp = new Date();
    }
}

// function to retrieve all users from the API
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

// function for handling HTTP errors

//TODO!

// async function handleRequestErrors (response) {
//     const status = response.status;
//     let errorData = null;
//
//     let message;
//     switch (status) {
//         case 400:
//             message = 'Неверный запрос'
//             break;
//         case 403:
//             message = 'Доступ запрещен'
//             break;
//         case 500:
//             message = 'Внутренняя ошибка сервера. Попробуйте позже'
//             break;
//         case 502:
//             message = 'Сервер временно недоступен. Попробуйте позже'
//             break;
//         case 504:
//             message = 'Превышено время ожидания ответа о сервера.'
//             break;
//         default:
//             `Ошибка ${status}: ${response.statusText}`;
//     }
// }