## 결과 화면 



<img width="411" alt="결과5" src="https://user-images.githubusercontent.com/102898911/207374888-4886dc0a-f608-425e-8045-2b4b503cdda3.png">






## 소스코드 
``` python 
import cv2
 
# Read image for contour detection
input_image = cv2.imread("shape3.png")
 
# Make a copy to draw bounding box
input_image_cpy = input_image.copy()
 
# Convert input image to grayscale
gray_img = cv2.cvtColor(input_image, cv2.COLOR_BGR2GRAY)
 
threshold_value = gray_img[216, 402]
print(threshold_value)
 
# Convert the grayscale image to binary (image binarization opencv python)
ret, binary_img = cv2.threshold(gray_img, threshold_value, 255, cv2.THRESH_BINARY)
 
# Invert image
inverted_binary_img = ~ binary_img
 
# Detect contours
# hierarchy variable contains information about the relationship between each contours
contours_list, hierarchy = cv2.findContours(inverted_binary_img,
                                       cv2.RETR_TREE,
                                       cv2.CHAIN_APPROX_SIMPLE) # Find contours
 
# for each detected contours
for contour_num in range(len(contours_list)):
 
    # Draw detected contour with shape name
    contour1 = cv2.drawContours(input_image_cpy, contours_list, contour_num, (255, 0, 255), 3)
 
    # Find number of points of detected contour
    end_points = cv2.approxPolyDP(contours_list[contour_num], 0.01 * cv2.arcLength(contours_list[contour_num], True), True)
 
    # Make sure contour area is large enough (Rejecting unwanted contours)
    if (cv2.contourArea(contours_list[contour_num])) > 10000:
 
        # Find first point of each shape
        point_x = end_points[0][0][0]
        point_y = end_points[0][0][1]
 
        # Writing shape name at center of each shape in black color (0, 0, 0)
        text_color_black = (0, 0, 0)
 
        # If a contour have three end points, then shape should be a Triangle
        if len(end_points) == 3:
            cv2.putText(input_image_cpy, '', (point_x, point_y),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, text_color_black, 2)
 
        # If a contour have four end points, then shape should be a Rectangle or Square
        elif len(end_points) == 4:
            cv2.putText(input_image_cpy, '', (point_x, point_y),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255,0,0), 2)
 
        # If a contour have five end points, then shape should be a Pentagon
        elif len(end_points) == 5:
            cv2.putText(input_image_cpy, '', (point_x, point_y),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, text_color_black, 2)
 
        # If a contour have ten end points, then shape should be a Star
        elif len(end_points) == 10:
            cv2.putText(input_image_cpy, '', (point_x, point_y),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, text_color_black, 2)
 
        # If a contour have more than ten end points, then shape should be a Star
        else:
            cv2.putText(input_image_cpy, '', (point_x, point_y),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, text_color_black, 2)

    cv2.putText(input_image_cpy, "circle" , (90,130), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    cv2.putText(input_image_cpy, "tri" , (90,350), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    cv2.putText(input_image_cpy, "lec" , (400,130), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    cv2.putText(input_image_cpy, "pen" , (220,240), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    cv2.putText(input_image_cpy, "hex" , (400,340), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    cv2.imshow('First detected contour', contour1)
    cv2.waitKey(0)
    cv2.destroyAllWindows() ``` 
