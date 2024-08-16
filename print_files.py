import os

def print_file_contents(directory):
    for root, dirs, files in os.walk(directory):
        # Skip the __pycache__ and .git directories
        dirs[:] = [d for d in dirs if d not in ('__pycache__', '.git')]
        
        for filename in files:
            # Skip binary files like .pyc and .git files
            if filename.endswith('.pyc') or filename == '.git':
                continue

            # Get the full path of the file
            filepath = os.path.join(root, filename)
            
            # Print the filename
            print(f"\n{'='*40}\nFile: {filepath}\n{'='*40}")
            
            # Print the contents of the file
            try:
                with open(filepath, 'r') as file:
                    print(file.read())
            except Exception as e:
                print(f"Could not read {filepath}. Error: {e}")

if __name__ == "__main__":
    # Define the directory containing your project files
    project_directory = '.'  # Update this to the correct path if necessary
    
    # Print the contents of each file in the directory
    print_file_contents(project_directory)
