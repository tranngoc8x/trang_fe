# API Reference

> Danh sách các API hiện đang được frontend gọi trong codebase, trình bày theo dạng `curl`, kèm request và response mẫu.
>
> **Lưu ý quan trọng**:
> - Các mục có nhãn **[ĐÃ VERIFY]** là response thực tế đã gọi bằng `curl` với token trong `.env`.
> - Các mục có nhãn **[SUY LUẬN]** là response mẫu suy ra từ frontend usage, chưa phải contract backend chính thức.
> - Backend hiện có cấu trúc rất giống Strapi 5, với `data`, `meta` và `pagination` ở nhiều collection endpoint.

## Phạm vi

Tài liệu này được tổng hợp từ các vị trí sau trong codebase:

- `src/constants/index.js:11`
- `src/services/api.js:7`
- `src/services/appService.js:6`

## Thông tin chung

- **Base URL**: `https://assets.kachivina.vn`
- **Authentication**: Bearer token qua header `Authorization`
- **Content-Type**: `application/json`
- Frontend đang dùng `axios` và trả về trực tiếp `response.data` trong `src/services/api.js:34`

## Header mẫu

```bash
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json'
```

---

## 1. Tree menu **[ĐÃ VERIFY]**

### GET `/api/tree-menus/menu`

```bash
curl --request GET 'https://assets.kachivina.vn/api/tree-menus/menu?locale=vi' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Request

Query params:

```json
{
  "locale": "vi"
}
```

### Response thực tế (verified 2026-04-22)

```json
{
  "data": [
    {
      "id": 19,
      "documentId": "i6kb98r2hnc69kxvcaz8gxc4",
      "title": "Main menu",
      "slug": "main-menu",
      "items": [
        {
          "id": "1",
          "url": "/",
          "title": "Trang chủ",
          "target": "_self",
          "children": [],
          "isProtected": false
        },
        {
          "id": "3",
          "url": "/san-pham-dich-vu",
          "title": "Sản phẩm / Dịch vụ",
          "target": "_self",
          "children": [
            {
              "id": "3.1",
              "url": "/san-pham-dich-vu/Gia-cong-co-khi",
              "title": "Gia công cơ khí",
              "target": "_self",
              "children": [],
              "isProtected": false
            }
          ],
          "isProtected": false
        }
      ],
      "createdAt": "2025-05-09T16:12:21.345Z",
      "updatedAt": "2026-01-19T10:36:15.680Z",
      "publishedAt": "2026-01-19T10:36:15.721Z",
      "locale": "vi"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 3
    }
  }
}
```

### GET `/api/tree-menus/menu/{id}` **[SUY LUẬN]**

```bash
curl --request GET 'https://assets.kachivina.vn/api/tree-menus/menu/<MENU_ID>?locale=vi' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Request

Path params:

```json
{
  "id": "<MENU_ID>"
}
```

Query params:

```json
{
  "locale": "vi"
}
```

### Response mẫu (chưa verify)

```json
{
  "data": {
    "id": "<MENU_ID>",
    "title": "Menu chính",
    "items": [
      {
        "id": "child-1",
        "title": "Sản phẩm",
        "url": "/san-pham"
      }
    ]
  },
  "meta": {}
}
```

---

## 2. Khách hàng **[ĐÃ VERIFY]**

### GET `/api/khach-hangs`

```bash
curl --request GET 'https://assets.kachivina.vn/api/khach-hangs?populate=logo' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Request

```json
{
  "populate": "logo"
}
```

### Response thực tế (verified 2026-04-22)

```json
{
  "data": [
    {
      "id": 17,
      "documentId": "kd4hpm9ngabbee8u9kmk86dp",
      "title": "Woosung Electronics",
      "website": "https://wsevn.com/",
      "createdAt": "2025-05-10T07:05:06.505Z",
      "updatedAt": "2025-07-17T08:09:11.322Z",
      "publishedAt": "2025-07-17T08:09:11.358Z",
      "logo": {
        "id": 27,
        "documentId": "pyyvzueol05a67uyao7u45g9",
        "name": "woosung e.png",
        "url": "/uploads/woosung_e_0f834bbae1.png"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 1,
      "pageCount": 7,
      "total": 7
    }
  }
}
```

### GET `/api/khach-hangs/{id}` **[SUY LUẬN]**

```bash
curl --request GET 'https://assets.kachivina.vn/api/khach-hangs/1' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response mẫu (chưa verify)

```json
{
  "data": {
    "id": 1,
    "title": "Khách hàng A",
    "logo": {
      "url": "/uploads/logo_a.png"
    }
  },
  "meta": {}
}
```

---

## 3. Slides **[ĐÃ VERIFY]**

### GET `/api/slides`

```bash
curl --request GET 'https://assets.kachivina.vn/api/slides?populate=image' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Request

```json
{
  "populate": "image"
}
```

### Response thực tế (verified 2026-04-22)

```json
{
  "data": [
    {
      "id": 25,
      "documentId": "ib68achu3dl8j0qdtngazw3n",
      "content": "<h1>KACHI VINA</h1><p><strong>TỐI ƯU HÓA QUY TRÌNH...</strong></p>",
      "createdAt": "2025-05-10T15:25:41.558Z",
      "updatedAt": "2025-12-11T04:51:01.810Z",
      "publishedAt": "2025-12-11T04:51:01.844Z",
      "position": ["left"],
      "image": {
        "id": 52,
        "documentId": "pghf8qk2pwtytrmjic17n4q0",
        "name": "a2.PNG",
        "width": 1502,
        "height": 502,
        "url": "/uploads/a2_1dbea8175a.PNG",
        "formats": {
          "large": {
            "url": "/uploads/large_a2_1dbea8175a.PNG",
            "width": 1000,
            "height": 334
          },
          "thumbnail": {
            "url": "/uploads/thumbnail_a2_1dbea8175a.PNG",
            "width": 245,
            "height": 82
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 1,
      "pageCount": 2,
      "total": 2
    }
  }
}
```

### GET `/api/slides/{id}` **[SUY LUẬN]**

```bash
curl --request GET 'https://assets.kachivina.vn/api/slides/1' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response mẫu (chưa verify)

```json
{
  "data": {
    "id": 1,
    "content": "...",
    "image": {
      "url": "/uploads/slide_1.jpg"
    }
  },
  "meta": {}
}
```

---

## 4. Home page content **[ĐÃ VERIFY]**

### GET `/api/home-page-content`

```bash
curl --request GET 'https://assets.kachivina.vn/api/home-page-content?locale=vi&populate=*' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Request

```json
{
  "locale": "vi",
  "populate": "*"
}
```

### Response thực tế (verified 2026-04-22)

```json
{
  "data": {
    "id": 19,
    "documentId": "bujyoup8zltuk9akof58tuct",
    "createdAt": "2025-05-10T15:48:17.337Z",
    "updatedAt": "2026-01-19T10:43:09.038Z",
    "publishedAt": "2026-01-19T10:43:09.194Z",
    "partner": {
      "id": 69,
      "title": "Đối tác của chúng tôi",
      "description": ""
    },
    "service": {
      "id": 70,
      "title": "Sản phẩm & Dịch vụ",
      "button_link": "/san-pham-dich-vu",
      "button_name": "Xem thêm"
    },
    "aboutus": {
      "id": 71,
      "title": "Về công ty",
      "button_link": "/gioi-thieu",
      "description": "<p>...</p>",
      "button_name": "Chi tiết"
    },
    "news": {
      "id": 72,
      "button_link": "/news",
      "button_name": "Read more"
    },
    "company_achievement": {
      "id": 45,
      "title": null,
      "description": ""
    }
  },
  "meta": {}
}
```

---

## 5. About uses **[ĐÃ VERIFY]**

### GET `/api/about-uses`

```bash
curl --request GET 'https://assets.kachivina.vn/api/about-uses' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response thực tế (verified 2026-04-22)

```json
{
  "data": [
    {
      "id": 16,
      "documentId": "nupeaeov3oq00hkwgmxafpvc",
      "title": "Câu Chuyện Của Chúng Tôi",
      "slug": "cau-chuyen-cua-chung-toi",
      "content": "<p>...</p>",
      "createdAt": "2025-05-06T23:53:43.605Z",
      "updatedAt": "2025-06-20T02:29:32.921Z",
      "publishedAt": "2025-06-20T02:29:33.004Z",
      "locale": "vi",
      "order": 1
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 1,
      "pageCount": 4,
      "total": 4
    }
  }
}
```

### GET `/api/about-uses/{id}` **[SUY LUẬN]**

```bash
curl --request GET 'https://assets.kachivina.vn/api/about-uses/1' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response mẫu (chưa verify)

```json
{
  "data": {
    "id": 1,
    "title": "Về chúng tôi",
    "content": "..."
  },
  "meta": {}
}
```

---

## 6. Products **[ĐÃ VERIFY]**

### GET `/api/products`

```bash
curl --request GET 'https://assets.kachivina.vn/api/products?populate=*' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Request

```json
{
  "populate": "*"
}
```

### Response thực tế (verified 2026-04-22)

```json
{
  "data": [
    {
      "id": 46,
      "documentId": "ib5j1ukhxxnktvw6lcddyb8u",
      "title": "Thiết kế, chế tạo Jig và máy tự động",
      "slug": "Jig-may-tu-dong",
      "description": "Thiết kế, chế tạo Jig và máy tự động",
      "locale": "vi",
      "show_in_home": null,
      "image": {
        "id": 68,
        "documentId": "zpio9ng8vn1tnhukp608i5kv",
        "name": "may gap san pham.jpg",
        "url": "/uploads/may_gap_san_pham_ffafaa6e9e.jpg"
      },
      "service": null,
      "dynamic_content": [],
      "SEO": {
        "id": 60,
        "metaTitle": "Thiết kế, chế tạo Jig và máy tự động",
        "metaDescription": "Thiết kế, chế tạo Jig và máy tự động"
      },
      "avatar": null,
      "localizations": []
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 1,
      "pageCount": 5,
      "total": 5
    }
  }
}
```

### GET `/api/products/{id}` **[SUY LUẬN]**

```bash
curl --request GET 'https://assets.kachivina.vn/api/products/1' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response mẫu (chưa verify)

```json
{
  "data": {
    "id": 1,
    "title": "Sản phẩm A",
    "slug": "san-pham-a",
    "description": "..."
  },
  "meta": {}
}
```

### GET `/api/products?filters[slug][$eq]={slug}&populate=*` **[SUY LUẬN]**

```bash
curl --request GET 'https://assets.kachivina.vn/api/products?filters[slug][$eq]=san-pham-a&populate=*' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Request

```json
{
  "filters": {
    "slug": "san-pham-a"
  },
  "populate": "*"
}
```

### Response mẫu

```json
{
  "data": [
    {
      "id": 1,
      "title": "Sản phẩm A",
      "slug": "san-pham-a",
      "gallery": [],
      "SEO": {}
    }
  ],
  "meta": {}
}
```

---

## 7. Services **[ĐÃ VERIFY]**

### GET `/api/services`

```bash
curl --request GET 'https://assets.kachivina.vn/api/services?populate=*' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response thực tế (verified 2026-04-22)

```json
{
  "data": [
    {
      "id": 12,
      "documentId": "kww2kzajcndnv5ictgvd2xvb",
      "title": "Vỏ tủ điện và linh kiện tủ điện",
      "slug": "Vo-tu-dien-linh-kien-tu-dien",
      "content": null,
      "createdAt": "2025-05-09T15:52:48.166Z",
      "updatedAt": "2026-01-19T09:59:23.611Z",
      "publishedAt": "2026-01-19T09:59:23.674Z",
      "locale": "vi",
      "show_in_home": null,
      "image": {
        "id": 62,
        "documentId": "esrjv0qr99mr2qlfdedovm83",
        "name": "Khoá tủ điện - AB302-1.jpg",
        "url": "/uploads/Khoa_tu_dien_AB_302_1_280365b078.jpg"
      },
      "products": [
        {
          "id": 49,
          "documentId": "r3msxoczi7r69d7sln14c31y",
          "title": "Vỏ tủ điện và linh kiện tủ điện",
          "slug": "Vo-tu-dien-linh-kien-tu-dien"
        }
      ],
      "localizations": []
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 1,
      "pageCount": 6,
      "total": 6
    }
  }
}
```

### GET `/api/services/{id}` **[SUY LUẬN]**

```bash
curl --request GET 'https://assets.kachivina.vn/api/services/1' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response mẫu (chưa verify)

```json
{
  "data": {
    "id": 1,
    "title": "Dịch vụ A",
    "slug": "dich-vu-a",
    "description": "..."
  },
  "meta": {}
}
```

### GET `/api/services?filters[slug][$eq]={slug}&populate=*` **[SUY LUẬN]**

```bash
curl --request GET 'https://assets.kachivina.vn/api/services?filters[slug][$eq]=dich-vu-a&populate=*' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response mẫu (chưa verify)

```json
{
  "data": [
    {
      "id": 1,
      "title": "Dịch vụ A",
      "slug": "dich-vu-a",
      "description": "..."
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

## 8. Báo giá và tư vấn **[SUY LUẬN]**

### GET `/api/bao-gia-and-tu-vans`

```bash
curl --request GET 'https://assets.kachivina.vn/api/bao-gia-and-tu-vans' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response mẫu

```json
{
  "data": [
    {
      "id": 1,
      "name": "Nguyễn Văn A",
      "phone": "0900000000",
      "message": "Tôi cần tư vấn"
    }
  ],
  "meta": {}
}
```

### POST `/api/bao-gia-and-tu-vans`

```bash
curl --request POST 'https://assets.kachivina.vn/api/bao-gia-and-tu-vans' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
    "data": {
      "name": "Nguyễn Văn A",
      "phone": "0900000000",
      "email": "a@example.com",
      "message": "Tôi cần tư vấn"
    }
  }'
```

### Request

```json
{
  "data": {
    "name": "Nguyễn Văn A",
    "phone": "0900000000",
    "email": "a@example.com",
    "message": "Tôi cần tư vấn"
  }
}
```

### Response mẫu

```json
{
  "data": {
    "id": 123,
    "name": "Nguyễn Văn A",
    "phone": "0900000000",
    "email": "a@example.com",
    "message": "Tôi cần tư vấn"
  },
  "meta": {}
}
```

---

## 9. Articles / Projects **[ĐÃ VERIFY]**

### GET `/api/articles`

```bash
curl --request GET 'https://assets.kachivina.vn/api/articles?populate=*' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response thực tế (verified 2026-04-22)

```json
{
  "data": [
    {
      "id": 13,
      "documentId": "s6tvv1k24u20o8sr83xsxdm0",
      "title": "Hệ thống băng chuyền trong nhà máy",
      "description": null,
      "slug": null,
      "createdAt": "2025-12-09T08:55:47.219Z",
      "updatedAt": "2025-12-09T08:55:47.219Z",
      "publishedAt": "2025-12-09T08:55:47.295Z",
      "cover": {
        "id": 47,
        "documentId": "ccx8b0xqtz9xuxxpc52qz8bw",
        "name": "Hệ thông băng chuyền trong nhà máy.jpg",
        "url": "/uploads/He_thong_bang_chuyen_trong_nha_may_be735a07d3.jpg"
      },
      "blocks": [],
      "SEO": null
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 1,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

### GET `/api/articles?filters[slug][$eq]={slug}&populate=*` **[SUY LUẬN]**

```bash
curl --request GET 'https://assets.kachivina.vn/api/articles?filters[slug][$eq]=du-an-a&populate=*' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Response mẫu (chưa verify)

```json
{
  "data": [
    {
      "id": 1,
      "title": "Dự án A",
      "slug": "du-an-a",
      "content": "...",
      "cover": {
        "url": "/uploads/project_a.jpg"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

## 10. Static pages **[ĐÃ VERIFY endpoint + pattern]**

### GET `/api/static-pages?filters[slug][$eq]={slug}&populate=*`

```bash
curl --request GET 'https://assets.kachivina.vn/api/static-pages?filters[slug][$eq]=gioi-thieu&populate=*' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Request

```json
{
  "filters": {
    "slug": "gioi-thieu"
  },
  "populate": "*"
}
```

### Response thực tế đã gọi với slug `lien-he` (verified 2026-04-22)

```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 1,
      "pageCount": 0,
      "total": 0
    }
  }
}
```

### Response mẫu khi có dữ liệu **[SUY LUẬN]**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Giới thiệu",
      "slug": "gioi-thieu",
      "content": "..."
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

## 11. Global config **[ĐÃ VERIFY]**

### GET `/api/global`

```bash
curl --request GET 'https://assets.kachivina.vn/api/global?populate=*' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### Request

```json
{
  "populate": "*"
}
```

### Response thực tế (verified 2026-04-22)

```json
{
  "data": {
    "id": 1,
    "documentId": "w28pd454smd6klrfbnllxsz3",
    "siteName": "Kachi Vina - Hotline: 0818 98 32 38",
    "createdAt": "2025-05-05T09:44:00.087Z",
    "updatedAt": "2026-01-21T16:38:46.942Z",
    "publishedAt": "2026-01-21T16:38:46.887Z",
    "map": "https://www.google.com/maps/embed?...",
    "footer_content": "<p>© 2025 Kachivina.vn. All rights reserved</p>",
    "favicon": {
      "id": 55,
      "documentId": "kufs3obnkk62xk3camgyu4ex",
      "name": "Icon_Kachi vina.png",
      "url": "/uploads/Icon_Kachi_vina_512febadbd.png"
    },
    "defaultSeo": {
      "id": 1,
      "metaTitle": "Kachi Vina - Gia công cơ khí chính xác...",
      "metaDescription": "Công ty TNHH Kachi Vina chuyên gia công cơ khí..."
    },
    "logo": {
      "id": 58,
      "documentId": "kn7p7b8g72gl6cnjed42vbv8",
      "name": "Icon_Kachi vina.png",
      "url": "/uploads/Icon_Kachi_vina_4f4d013907.png"
    },
    "logo2": {
      "id": 58,
      "documentId": "kn7p7b8g72gl6cnjed42vbv8",
      "name": "Icon_Kachi vina.png",
      "url": "/uploads/Icon_Kachi_vina_4f4d013907.png"
    }
  },
  "meta": {}
}
```

---

## 12. API demo trong service **[SUY LUẬN]**

Các endpoint sau xuất hiện ở `src/services/appService.js:6`, nhưng hiện em chưa thấy được dùng trong UI chính:

### GET `/users`

```bash
curl --request GET 'https://assets.kachivina.vn/users' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### GET `/users/{id}`

```bash
curl --request GET 'https://assets.kachivina.vn/users/1' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

### POST `/users`

```bash
curl --request POST 'https://assets.kachivina.vn/users' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Nguyễn Văn A",
    "email": "a@example.com"
  }'
```

### PUT `/users/{id}`

```bash
curl --request PUT 'https://assets.kachivina.vn/users/1' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Nguyễn Văn A"
  }'
```

### DELETE `/users/{id}`

```bash
curl --request DELETE 'https://assets.kachivina.vn/users/1' \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json'
```

---

## Ghi chú

- Đây là tài liệu tổng hợp từ **frontend usage**, không phải contract chính thức từ backend.
- Một số response mẫu được suy ra từ cách code đang đọc dữ liệu trong các file page, component và hook.
- Cấu trúc query như `populate`, `filters`, `locale` cho thấy backend đang đi theo kiểu rất giống Strapi.
