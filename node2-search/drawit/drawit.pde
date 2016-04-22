

void setup() {
  size(640, 320);
  background(255);


  for (int i=0; i<100; i++) {
    stroke(int(random(255)), 0, int(random(100, 255)));
    line(0, 0, int(random(0, width)), height);
  }
  
  save("drawing.png");
  exit();

}