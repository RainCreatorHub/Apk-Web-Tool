import supabase from './supabase-client.js';

const form = document.getElementById('uploadForm');
const statusDiv = document.getElementById('status');
const submitButton = document.getElementById('submitButton');

const imageProgressContainer = document.getElementById('imageProgressContainer');
const imageProgressBar = document.getElementById('imageProgressBar');
const apkProgressContainer = document.getElementById('apkProgressContainer');
const apkProgressBar = document.getElementById('apkProgressBar');

const uploadOptions = {
    cacheControl: '3600',
    upsert: false
};

function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = type;
    statusDiv.style.display = 'block';
}

function updateProgress(bar, container, percentage) {
    container.style.display = 'block';
    const percent = Math.round(percentage);
    bar.style.width = `${percent}%`;
    bar.textContent = `${percent}%`;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const appName = document.getElementById('appName').value;
    const appDescription = document.getElementById('appDescription').value;
    const imageFile = document.getElementById('appImage').files[0];
    const apkFile = document.getElementById('appApk').files[0];

    if (!appName || !appDescription || !imageFile || !apkFile) {
        showStatus('Por favor, preencha todos os campos.', 'error');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    showStatus('Iniciando upload...', 'success');

    try {
        const imagePath = `public/${Date.now()}-${imageFile.name}`;
        const { error: imageError } = await supabase.storage
            .from('images')
            .upload(imagePath, imageFile, {
                ...uploadOptions,
                onProgress: (event) => {
                    const percentage = (event.loaded / event.total) * 100;
                    updateProgress(imageProgressBar, imageProgressContainer, percentage);
                }
            });
        if (imageError) throw imageError;
        showStatus('Imagem enviada. Enviando APK...', 'success');

        const { data: imageData } = supabase.storage
            .from('images')
            .getPublicUrl(imagePath);
        const imageUrl = imageData.publicUrl;

        const apkPath = `public/${Date.now()}-${apkFile.name}`;
        const { error: apkError } = await supabase.storage
            .from('apks')
            .upload(apkPath, apkFile, {
                ...uploadOptions,
                onProgress: (event) => {
                    const percentage = (event.loaded / event.total) * 100;
                    updateProgress(apkProgressBar, apkProgressContainer, percentage);
                }
            });
        if (apkError) throw apkError;
        showStatus('APK enviado. Salvando informações...', 'success');

        const { data: apkData } = supabase.storage
            .from('apks')
            .getPublicUrl(apkPath);
        const apkUrl = apkData.publicUrl;

        const { error: insertError } = await supabase
            .from('apks')
            .insert([{ 
                name: appName, 
                description: appDescription, 
                image_url: imageUrl, 
                apk_url: apkUrl 
            }]);
        if (insertError) throw insertError;

        showStatus('Aplicativo publicado com sucesso!', 'success');
        form.reset();
        imageProgressContainer.style.display = 'none';
        apkProgressContainer.style.display = 'none';

    } catch (error) {
        console.error('Erro no processo de upload:', error);
        showStatus(`Erro: ${error.message}`, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
});
