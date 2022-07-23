void setup()
{ 
    Serial.begin(9600);
  
}

void loop()
{

  int RanNumber = random(90, 110);
  
  Serial.println(RanNumber);
  
}
