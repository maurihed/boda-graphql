import {Arg, Mutation, Query, Resolver, Int} from "type-graphql";
import { Guest, GuestInputType } from "../entity/Guest";
import { Family, FamilyInputType } from "../entity/Family";
import { FamilySide } from "../enums/familySide.enum";

@Resolver()
export class FamilyResolver {
  @Query(() => [Family])
  async families() {
    return await Family.find({
      relations: ['guests'],
      loadRelationIds: false
    });
  }


  @Mutation(() => Family)
  async newFamily(
    @Arg('name') name: string,
    @Arg('familySide', () => FamilySide) familySide: FamilySide,
    @Arg('guests', () => [GuestInputType], {nullable: true}) guests?: GuestInputType[]
  ) {
    try {
      const {identifiers: [{id: familyId}]} = await Family.insert({ name, familySide });
      if (guests?.length) {
        guests.forEach((guest: GuestInputType) => Guest.insert({...guest, familyId}));
      }

      return await Family.findOne(familyId,
        {
          relations: ['guests'],
          loadRelationIds: false,
        }
      );
    } catch(err) {
      console.error(err);
      return {
        hasError: true,
        error: err,
      };
    }
  }

  @Mutation(() => Family)
  async updateFamily(
    @Arg('familyId', () => Int) familyId: number,
    @Arg('family') family: FamilyInputType
  ){
    try {
      await Family.update(familyId, family);
      return await Family.findOne(familyId,
        {
          relations: ['guests'],
          loadRelationIds: false,
        }
      );
    } catch(err) {
      console.error(err);
      return {
        hasError: true,
        error: err,
      };
    }
  }

  @Mutation(() => Int)
  async deleteFamily (@Arg('familyId', () => Int) familyId: number) {
    try {
      Family.delete(familyId);
      return familyId;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
