import { apiClient } from './apiClient';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

const FALLBACK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Cơm Tấm Sườn Bì Chả',
        price: 35,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        description: 'Cơm tấm thơm ngon, sườn nướng đậm vị giao tận phòng KTX.',
    },
    {
        id: '2',
        name: 'Bún Bò Huế Đặc Biệt',
        price: 40,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
        description: 'Bún bò nước dùng đậm đà, giò heo, chả nướng nóng hổi.',
    },
    {
        id: '3',
        name: 'Trà Sữa Trân Châu Đường Đen',
        price: 25,
        image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=500',
        description: 'Trà sữa trân châu dai ngon, độ ngọt vừa phải nạp năng lượng học bài.',
    },
    {
        id: '4',
        name: 'Bánh Mì Kẹp Thịt Nướng',
        price: 20,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500',
        description: 'Bánh mì giòn rụm kẹp thịt nướng pate thơm phức.',
    },
    {
        id: '5',
        name: 'Mì Cay Hải Sản Hàn Quốc',
        price: 45,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
        description: 'Mì cay hải sản tôm mực chua cay hấp dẫn.',
    },
    {
        id: '6',
        name: 'Cà Phê Sữa Đá Sài Gòn',
        price: 18,
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500',
        description: 'Cà phê nguyên chất đậm đà tỉnh táo cả ngày.',
    },
];

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await apiClient.get('/products');
        if (Array.isArray(response.data) && response.data.length > 0) {
            return response.data;
        }
    } catch (e) {
        console.warn('API call failed, using fallback products:', e);
    }
    return FALLBACK_PRODUCTS;
};