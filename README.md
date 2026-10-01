# NGUYEN DINH QUAN | 23737091 | https://github.com/DinhQuann/23737091_TH2.git | #4F21A9 | Số cuối: 1 | Watermark: Dưới | AuthField: phone | TabOrder: Shop->Giỏ->Tôi | Haptic: selection | Phí: B | Detail: card

## KTXGo - App Đặt đồ Ký Túc Xá (TH2)

- **MSSV**: 23737091
- **Họ và tên**: NGUYEN DINH QUAN
- **Repo**: 23737091_TH2
- **URL**: https://github.com/DinhQuann/23737091_TH2.git

### Biến thể cá nhân hóa (Số cuối = 1):
- **Watermark**: Dưới (Bottom)
- **Ô Login**: Phone (`phone-pad`)
- **Thứ tự Tab**: Cửa hàng -> Giỏ -> Tôi
- **Haptic**: Selection (`selectionAsync()`)
- **Công thức phí ship**: B (`BASE_SHIP_FEE + Math.round(km * 1500) + 2000`)
- **Màn hình Chi tiết**: Card (Push Stack)

### Hình ảnh minh họa (docs/):
- `docs/screenshot-th2-home.png`
- `docs/screenshot-th2-cart.png`

### Công nghệ sử dụng:
- React Native CLI + TypeScript
- FlashList (2 cột, estimatedItemSize, keyExtractor ghép mssv)
- React Navigation V7 (AuthStack + MainTabs + ShopStack)
- Zustand + Persist AsyncStorage
- TanStack React Query + Axios (interceptors X-Student-Id)
