# Deployment Checklist

Steps to perform before every deployment to ensure a smooth process.

1.  **Optimize Photos:**
    Run the optimization script to generate thumbnails and compress images.
    ```bash
    ./optimize-photos.sh
    ```

2.  **Commit Optimized Photos:**
    Add and commit the newly generated or updated photos and thumbnails in the `public/photos` directory.
    ```bash
    git add public/photos
    git commit -m "feat: update optimized photos"
    ```

3.  **Local Build Verification:**
    Run the build command locally to ensure everything compiles correctly without errors.
    ```bash
    npm run build
    ```

4.  **Push to GitHub:**
    Push your changes to the main branch on GitHub.
    ```bash
    git push origin main
    ```

5.  **Deploy to Vercel:**
    The push to the main branch should automatically trigger a new deployment on Vercel. Monitor the deployment process in your Vercel dashboard.
