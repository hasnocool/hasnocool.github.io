import os
import re
import argparse
import asyncio
from concurrent.futures import ThreadPoolExecutor

def sanitize_filename(filename):
    """
    Sanitize the filename by removing or replacing problematic characters.
    """
    sanitized_filename = re.sub(r'[\'\",]', '', filename)  # Remove quotes and commas
    sanitized_filename = re.sub(r'[\s]+', '_', sanitized_filename)  # Replace spaces with underscores
    return sanitized_filename

def rename_file(old_file_path, new_file_path):
    """
    Rename a single file from old_file_path to new_file_path.
    """
    try:
        os.rename(old_file_path, new_file_path)
        print(f"Renamed: {old_file_path} -> {new_file_path}")
    except Exception as e:
        print(f"Error renaming {old_file_path} to {new_file_path}: {e}")

async def rename_files_in_directory(input_dir, output_dir, max_workers=5):
    """
    Asynchronously rename files in the specified directory using threading for concurrency.
    """
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        loop = asyncio.get_running_loop()
        tasks = []
        for filename in os.listdir(input_dir):
            if filename.endswith('.png'):
                sanitized_filename = sanitize_filename(filename)
                old_file_path = os.path.join(input_dir, filename)
                new_file_path = os.path.join(output_dir, sanitized_filename)
                
                if old_file_path != new_file_path:
                    task = loop.run_in_executor(executor, rename_file, old_file_path, new_file_path)
                    tasks.append(task)
        
        # Wait for all tasks to complete
        await asyncio.gather(*tasks)

def main():
    parser = argparse.ArgumentParser(description='Asynchronously rename files by removing problematic characters from filenames.')
    parser.add_argument('-i', '--input-dir', type=str, default='.', help='Input directory containing files to rename (default: current directory)')
    parser.add_argument('-o', '--output-dir', type=str, default='.', help='Output directory to place renamed files (default: current directory)')
    
    args = parser.parse_args()
    
    input_dir = os.path.abspath(args.input_dir)
    output_dir = os.path.abspath(args.output_dir)

    if not os.path.exists(input_dir):
        print(f"Error: Input directory '{input_dir}' does not exist.")
        return
    
    if not os.path.exists(output_dir):
        print(f"Error: Output directory '{output_dir}' does not exist.")
        return

    # Run the asynchronous file renaming
    asyncio.run(rename_files_in_directory(input_dir, output_dir))

if __name__ == '__main__':
    main()
