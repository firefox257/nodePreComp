
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


class try1
{
	
	
		private: 
		int _w; 
		public: 
		static int getw(try1 * at){ return at->_w;} 
		static void setw(try1 * at, int v){ at->_w = v; } 
		GetSetObserver<int> w = GetSetObserver<int>(this, (void*)getw, (void*)setw);

};


int main()
{
	cout << "here1";
	try1 t1;
	
	t1.w = 123;
	cout << "w: " << t1.w << "\r\n";
	return 0;
}