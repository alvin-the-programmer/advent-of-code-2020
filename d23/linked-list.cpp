#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <set>
#include <chrono>

using namespace std;

struct Node {
  long long int value;
  Node* next;
};

class CupList {
  public: 
    long long int minValue;
    long long int maxValue;
    Node* head;
    unordered_map<long long int, Node*> refs;

    CupList(vector<long long int> values) {
      head = createCircle(values);
      refs = createRefs();
      minValue = min(values);
      maxValue = max(values);
    }

    void simulate(int n) {
      for (int i = 0; i < n; i += 1) {
        playRound();
      }
    }

    void print() {
      Node* currPtr = head;
      set<long long int> seen;
      while (seen.count(currPtr->value) == 0) {
        cout << currPtr->value << " ";
        seen.insert(currPtr->value);
        currPtr = currPtr->next;
      }
      cout << endl;
    }

  private:
    Node* createCircle(vector<long long int> values) {
      Node* headPtr = new Node { values[0], nullptr };
      Node* currPtr = headPtr;
      for (int i = 1; i < values.size(); i += 1 ) {
        currPtr->next = new Node { values[i], nullptr };
        currPtr = currPtr->next;
      }
      currPtr->next = headPtr;
      return headPtr;
    }

    unordered_map<long long int, Node*> createRefs() {
      unordered_map<long long int, Node*> refs;
      Node* currPtr = head;
      while (refs.find(currPtr->value) == refs.end()) {
        refs[currPtr->value] = currPtr;
        currPtr = currPtr->next;
      }
      return refs;
    }

    void playRound() {
      vector<long long int> triplet = nextThreeValues(head);
      set<long long int> tripletMembers;
      tripletMembers.insert(triplet[0]);
      tripletMembers.insert(triplet[1]);
      tripletMembers.insert(triplet[2]);
      Node* tripletHead = refs[triplet[0]];
      Node* tripletTail = refs[triplet[2]];
      head->next = tripletTail->next;

      long long int destinationValue = (head->value) - 1;

      while (true) {
        if (destinationValue < minValue) {
          destinationValue = maxValue;
        }
        if (tripletMembers.count(destinationValue) != 1) {
          break;
        }
        destinationValue -= 1;
      }

      Node* destination = refs[destinationValue];
      tripletTail->next = destination->next;
      destination->next = tripletHead;
      head = head->next;
    }

    vector<long long int> nextThreeValues(Node* node) {
      vector<long long int> values;
      values.push_back(node->next->value);
      values.push_back(node->next->next->value);
      values.push_back(node->next->next->next->value); // who cares ¯\_(ツ)_/¯
      return values;
    }
    

    long long int min(vector<long long int> values) {
      long long int result = values[0];
      for (long long int value: values) {
        if (value < result) {
          result = value;
        }
      }
      return result;
    }

    long long int max(vector<long long int> values) {
      long long int result = values[0];
      for (long long int value: values) {
        if (value > result) {
          result = value;
        }
      }
      return result;
    }
};

int main() {
  chrono::steady_clock::time_point begin = chrono::steady_clock::now();

  int MIL = 1000000;
  int TEN_MIL = 10 * MIL;
  // vector<long long int> values {3,8,9,1,2,5,4,6,7}; // example
  vector<long long int> values {9,6,2,7,1,3,8,5,4}; // input
  for (long long int i = 10; i <= MIL; i += 1) {
    values.push_back(i);
  }
  CupList cl { values };
  cl.simulate(TEN_MIL);

  Node* onePtr = cl.refs[1];
  long long int res = onePtr->next->value * onePtr->next->next->value;

  chrono::steady_clock::time_point end = chrono::steady_clock::now();
  cout << "finished in " << chrono::duration_cast<chrono::seconds>(end - begin).count() << "s" << endl;
  cout << res << endl;
  return 0;
}