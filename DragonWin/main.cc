#include "D:/Programs/vcpkg/installed/x64-windows/include/drogon/drogon.h"
// #include <D:/Programs/vcpkg/installed/x64-windows/include/drogon/HttpAppFramework.h>


using namespace drogon;

int main() {
    //Set HTTP listener address and port
    app().addListener("127.0.0.1", 8001);
    // loadConfigFile("./config.json")
    //Load config file
    //drogon::app().loadConfigFile("../config.json");
    //Run HTTP framework,the method will block in the internal event loop
    app().run();
    return 0;
}
