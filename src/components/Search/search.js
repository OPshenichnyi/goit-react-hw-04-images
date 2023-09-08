import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '38368934-291effe9d25e1bec757593010'

export function getApi(content, page, per_page) {
    return axios.get(API_URL,
        {
            params: {
                key: API_KEY,
                'q': `${content.name}`,
                image_type: 'photo',
                page: `${page}`,
                per_page: `${per_page}`
            }
})
}


