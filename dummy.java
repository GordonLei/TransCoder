public static void createDirectory(Path path) throws IOException {
  if(!Files.exists(path)){
    Files.createDirectories(path);
  }
}