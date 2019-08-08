


#include<iostream>
#include <iostream>
#include <string>
#include <list>
using namespace std;



template<class V>
class GetSet
{
	void * p = 0;
	V (*g)(void * p);
	void(*s)(void* p, V v);
	public:
	GetSet(void * _p, void * _g, void* _s)
	{
		p = _p;
		g = (V(*)(void*))_g;
		s = (void(*)(void*, V))_s;
	}
	
	void operator = (V v)
	{
		s(p, v);
	}
	operator V()
	{
		return g(p);
	}
	
};


template<class V>
class GetSetObserver
{
	private:
	void * p = 0;
	V (*g)(void * p);
	void(*s)(void* p, V v);
	
	
	class _obNode
	{
		public:
		void * p;
		void(*event)(void *, V);
	};
	list<_obNode> ob; 
	
	
	public:
	GetSetObserver(void * _p, void * _g, void* _s)
	{
		p = _p;
		g = (V(*)(void*))_g;
		s = (void(*)(void*, V))_s;
	}
	
	void operator = (V v)
	{
		s(p, v);
		for(_obNode fp: ob)
		{
			fp.event(fp.p, v);
		}
	}
	operator V()
	{
		return g(p);
	}
	
	void addEvent(void * _p, void * event)
	{
		ob.push_back({p, (void(*)(void*, V))event});
	}
	
};


template <class V>
class ListObserver
{
};

class try1
{
	
		private: 
		string _title; 
		public: 
		static string gettitle(try1 * at){ return at->_title;} 
		static void settitle(try1 * at, string v){ at->_title = v; } 
		GetSetObserver<string> title = GetSetObserver<string>(this, (void*)gettitle, (void*)settitle);
	
		private: 
		int _w; 
		public: 
		static int getw(try1 * at){ return at->_w;} 
		static void setw(try1 * at, int v){ at->_w = v; } 
		GetSetObserver<int> w = GetSetObserver<int>(this, (void*)getw, (void*)setw);
	public:
	static unsigned int hashName()
	{
		hi there
		return 3569110;
	}

};

class try2
{
	public:
	try1 data;
	try2()
	{
		data.title.addEvent(this, (void*)titleEvent);
		data.title = "hi there";
	}
	static void titleEvent(try2 * at, string v)
	{
		cout << "changed string title: " << v << "\r\n";
	}
	
};

int main()
{
	try2 t2;
	
	t2.data.title = "and more";
	
	return 0;
}