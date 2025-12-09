import os
import zipfile
import xml.etree.ElementTree as ET
import argparse
import shutil

def extract_pptx_data(pptx_path, output_dir):
    """
    Extracts images and text from a .pptx file.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    images_dir = os.path.join(output_dir, 'images')
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)

    text_content = []

    try:
        with zipfile.ZipFile(pptx_path, 'r') as pptx_zip:
            # Extract Images
            for file_name in pptx_zip.namelist():
                if file_name.startswith('ppt/media/'):
                    image_name = os.path.basename(file_name)
                    target_path = os.path.join(images_dir, image_name)
                    with pptx_zip.open(file_name) as source, open(target_path, 'wb') as target:
                        shutil.copyfileobj(source, target)
                    print(f"Extracted image: {image_name}")

            # Extract Text from Slides
            # Slides are usually in ppt/slides/slideX.xml
            slide_files = [f for f in pptx_zip.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
            # Sort slides by number (slide1, slide2, etc.)
            slide_files.sort(key=lambda x: int(os.path.basename(x).replace('slide', '').replace('.xml', '')))

            for slide_file in slide_files:
                with pptx_zip.open(slide_file) as slide_xml:
                    tree = ET.parse(slide_xml)
                    root = tree.getroot()
                    
                    # Namespace for DrawingML
                    namespaces = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
                    
                    slide_text = []
                    # Find all text runs (a:t)
                    for text_element in root.findall('.//a:t', namespaces):
                        if text_element.text:
                            slide_text.append(text_element.text)
                    
                    if slide_text:
                        text_content.append(f"--- Slide {os.path.basename(slide_file)} ---")
                        text_content.append(" ".join(slide_text))
                        text_content.append("\n")

        # Save Text Content
        with open(os.path.join(output_dir, 'content.txt'), 'w') as f:
            f.write("\n".join(text_content))
            print(f"Extracted text to: {os.path.join(output_dir, 'content.txt')}")

    except zipfile.BadZipFile:
        print("Error: The file is not a valid PowerPoint file.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract text and images from a PPTX file.")
    parser.add_argument("pptx_file", help="Path to the source .pptx file")
    parser.add_argument("--output", default="extracted_data", help="Directory to save extracted assets")

    args = parser.parse_args()

    extract_pptx_data(args.pptx_file, args.output)
