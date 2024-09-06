from PIL import Image
import os

def compress_image(image_path, output_path, quality=85):
    """
    Compress JPEG and PNG images using Pillow.
    :param image_path: Input path of the image.
    :param output_path: Output path where compressed image will be saved.
    :param quality: Compression quality for JPEG (1-100). Default is 85.
    """
    try:
        # Open an image file
        with Image.open(image_path) as img:
            # Check if the image is in JPEG or PNG format
            if img.format == 'JPEG':
                # Save JPEG images with compression
                img.save(output_path, 'JPEG', optimize=True, quality=quality)
                print(f"JPEG image compressed and saved to {output_path}")
            elif img.format == 'PNG':
                # Save PNG image with Pillow's built-in optimization
                img.save(output_path, 'PNG', optimize=True)
                print(f"PNG image compressed and saved to {output_path}")
            else:
                print(f"Unsupported image format: {img.format}")

            # Remove the original file after compression
            os.remove(image_path)
            print(f"Original file {image_path} deleted.")

    except Exception as e:
        print(f"Error compressing image: {e}")

def optimize_images_in_directory(input_directory, output_directory):
    """
    Compress and optimize all JPEG and PNG images in a directory.
    :param input_directory: Path to the directory containing input images.
    :param output_directory: Path to the directory to save optimized images.
    """
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Iterate over all files in the input directory
    for filename in os.listdir(input_directory):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            input_path = os.path.join(input_directory, filename)
            output_path = os.path.join(output_directory, filename)

            # Ensure proper path handling for different operating systems
            input_path = os.path.normpath(input_path)
            output_path = os.path.normpath(output_path)

            compress_image(input_path, output_path)

# Example usage
if __name__ == "__main__":
    input_dir = os.path.normpath('./assets')  # Folder with original images
    output_dir = os.path.normpath('./assets/optimized')  # Folder to store optimized images
    
    optimize_images_in_directory(input_dir, output_dir)
