#include <bits/stdc++.h>
using namespace std;
#define rep(i, n) for (int i=0; i<n; i++)
#define FOR(i, a, b) for (int i=a; i<b; i++)
#define all(a) (a).begin(), (a).end()
using vi = vector<int>;
using vvi = vector<vi>;
using vb = vector<bool>;
using vvb = vector<vb>;
using pi = pair<int, int>;
using vpi = vector<pi>;
using ll = long long;
const int dx[] = {1, 1, 0, -1, -1, -1, 0, 1};
const int dy[] = {0, 1, 1, 1, 0, -1, -1, -1};
// (0, 1)(↓)から反時計回り
// o==========> y
// |
// |
// |
// |
// |
// \/
// x


void makeIndirectRandomRable(vvi &table, int &number, int &height, int &width) {
  random_device rnd;
  mt19937 engine(rnd());
  vvb check(height, vb(width, false));
  rep(i, height) rep(j, width) while (true) {
    int x, y, player;
    x = engine()%height;
    y = engine()%8;
    player = engine()%number;
    if (!check[x][y]) {
      table[x][y] = player;
      cout << x << " " << y << " " << player << endl;
      check[x][y] = true;
      break;
    }
  }
}

void makeDirectRandomTable(vvi &table, int &number, int &height, int &width) {
  random_device rnd;
  mt19937 engine(rnd());
  rep(x, height) rep(y, width) table[x][y] = engine()%number;
}

void inputIndirectTable(int &height, int &width, vvi &table) {
  rep(i, height) {
    rep(j, width) {
      int x, y, player;
      cin >> x >> y >> player;
      table[x][y] = player;
    }
  }
}

void inputDirectTable(int &height, int &width, vvi &table) {
  rep(x, height) {
    rep(y, width) {
      cin >> table[x][y];
    }
  }
}

void showTable(int &height, int &width, vvi &table) {
  rep(x, height) {
    rep(y, width) {
      cout << table[x][y] << " ";
    }
    cout << endl;
  }
  cout << endl;
}

void showPoints(int &number, vvi &points) {
  rep(i, number) {
    cout << "player " << i << " :" << endl;
    cout << "  basic points : " << points[0][i] << "pt" << endl;
    cout << "  combo points : " << points[1][i] << "pt" << endl;
    cout << "  total points : " << points[0][i]+points[1][i] << "pt" << endl;
    cout << endl;
  }
}

void comboWays(int &height, int &width, int &length, int &addition, vvi &table, vvi &points, int &x, int &y, int &player, int &way) {
  int nowx = x, nowy = y;
  int nowplayer = table[nowx][nowy]; // nowplayer = player
  // if (x+1 == y && wayx*wayy == 1) cout << x << " " << y << " " << player << endl;
  bool check = true;
  rep(i, length-1) {
    nowx += dx[way]; 
    nowy += dy[way];
    if (nowx<0 || nowx>=height || nowy<0 || nowy>=width) {
      check = false;
      break;
    }
    nowplayer = table[nowx][nowy];
    // if (x+1 == y && wayx*wayy == 1) cout << "  " << nowx << " " << nowy << " " << nowplayer << endl;
    if (nowplayer != player) {
      check = false;
      break;
    }
  }
  if (check) {
    points[1][player] += addition;
    // cout << "    player " << player << "has got them!!!!!!!!!!!!!!!!!!!!!!!!!!!" << endl;
  }
}

void CalculateComboPoints(int number, int &height, int &width, int &length, int &addition, vvi &table, vvi &points) {
  rep(x, height) rep(y, width) {
    rep(way, 8) {
      int player = table[x][y];
      if (player<0 || number<=player) continue;
      comboWays(height, width, length, addition, table, points, x, y, player, way);
    }
  }
  rep(i, number) points[1][i] /= 2;
}

void calculateBasicPoints(int &number, int &height, int &width, int &length, vvi &table, vvi &points) {
  rep(i, number) points[0][i] = 0;
  rep(x, height) rep(y, width) rep(k, number) {
    if (table[x][y] == k) points[0][k]++;
  }
}

void calculatePoints(int &number, int &height, int &width, int &length, int &addition, vvi &table, vvi &points) {
  calculateBasicPoints(number, height, width, length, table, points);
  CalculateComboPoints(number, height, width, length, addition, table, points);
}

int main() {
  int number = 2, height = 6, width = 8, length = 5, addition = length, rate = 1; // integer
  vvi table(height, vi(width, -1)), points(2, vi(number, 0)); // vector

  // makeIndirectRandomRable(table, number, height, width); // => table, out

  makeDirectRandomTable(table, number, height, width); // => table

  // inputDirectTable(height, width, table); // in => table

  // inputIndirectTable(height, width, table); // in => table

  showTable(height, width, table); // table => out

  calculatePoints(number, height, width, length, addition, table, points); // table => points

  showPoints(number, points); // point => out 

  return 0;
}
