
void setup() {
  size(640, 360);
  background(51);
  for (int i = 0; i < 100; i++) {
    float x1 = random(0,width/2);
    float y1 = 0;
    float x2 = random(width/2,width);
    float y2 = height;
   
    stroke(x1, 0, y2/2, 100);
    line(x1, y1, x2, y2);
  }
  save("output.png");
  exit();
}