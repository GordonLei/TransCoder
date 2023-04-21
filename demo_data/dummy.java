public class Main {
    private int i = 2;
    private int x = 3 
    public int add (int z){
        return z + i + x;
    }
    public static void main(String[] args){
        Main m = new Main();

        System.out.println(m.add(5));

    }
}
