// 初始作品数据
let works = [
    { type: 'image', url: 'assets/sample-image.jpg', caption: '网页设计作品' },
    { type: 'video', url: 'assets/sample-video.mp4', caption: '宣传视频' }
];

// 页面加载初始化
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
});

// 切换上传面板
function toggleUpload() {
    const section = document.getElementById('uploadSection');
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

// 上传功能
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const files = document.getElementById('fileInput').files;
    
    for (const file of files) {
        // 本地预览功能（实际部署需替换为真实上传）
        const reader = new FileReader();
        reader.onload = (e) => {
            works.unshift({
                type: file.type.startsWith('image') ? 'image' : 'video',
                url: e.target.result,
                caption: file.name
            });
            renderGallery();
        };
        reader.readAsDataURL(file);
    }
    
    alert('本地预览已添加，实际部署需配置服务器上传');
    document.getElementById('uploadForm').reset();
});

// 渲染作品集
function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = works.map(item => `
        <div class="col">
            <div class="card h-100 portfolio-item">
                ${item.type === 'image' ? 
                    `<img src="${item.url}" class="card-img-top" alt="${item.caption}">` :
                    `<video class="card-img-top" controls>
                        <source src="${item.url}" type="video/mp4">
                    </video>`
                }
                <div class="card-body">
                    <p class="card-text text-muted">${item.caption}</p>
                </div>
            </div>
        </div>
    `).join('');
}