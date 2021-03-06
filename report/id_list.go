package report

import "sort"

// IDList is a list of string IDs, which are always sorted and unique.
type IDList StringSet

// MakeIDList makes a new IDList.
func MakeIDList(ids ...string) IDList {
	return IDList(MakeStringSet(ids...))
}

// Add is the only correct way to add ids to an IDList.
func (a IDList) Add(ids ...string) IDList {
	return IDList(StringSet(a).Add(ids...))
}

// Copy returns a copy of the IDList.
func (a IDList) Copy() IDList {
	return IDList(StringSet(a).Copy())
}

// Merge all elements from a and b into a new list
func (a IDList) Merge(b IDList) IDList {
	return IDList(StringSet(a).Merge(StringSet(b)))
}

// Contains returns true if id is in the list.
func (a IDList) Contains(id string) bool {
	i := sort.Search(len(a), func(i int) bool { return a[i] >= id })
	return i < len(a) && a[i] == id
}
