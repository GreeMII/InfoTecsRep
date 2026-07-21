const API_URL = 'https://corsproxy.io/?https://dummyjson.com/users';

export class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

async function handleRequestErrors(response) {
    const status = response.status;
    let errorData = null;

    try {
        errorData = await response.json();
    } catch {

        errorData = { message: response.statusText };
    }

    let message;
    switch (status) {
        case 400:
            message = 'Неверный запрос';
            break;
        case 401:
            message = 'Необходима авторизация';
            break;
        case 403:
            message = 'Доступ запрещен';
            break;
        case 404:
            message = 'Страница не найдена';
            break;
        case 500:
            message = 'Внутренняя ошибка сервера. Попробуйте позже';
            break;
        case 502:
            message = 'Сервер временно недоступен. Попробуйте позже';
            break;
        case 503:
            message = 'Сервис временно недоступен';
            break;
        case 504:
            message = 'Превышено время ожидания ответа от сервера';
            break;
        default:
            message = `Ошибка ${status}: ${response.statusText}`;
    }


    console.error(`${message}`);
    if (errorData && errorData.message) {
        console.error('Детали:', errorData.message);
    }

    return new ApiError(message, status, errorData);
}

// function to retrieve all users from the API
export const UserApi = {
    async getAllUsers() {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw await handleRequestErrors(response);
            }

            const data = await response.json();
            console.log('Загружено пользователей:', data.users?.length || data.length);
            return data;
        } catch (error) {
            console.error('Ошибка при загрузке:', error);
            throw new ApiError(
                'Ошибка сети или сервер недоступен',
                0,
                {originalError: error.message}
            );
        }
    }
};