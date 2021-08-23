import {Arg, Mutation, Query, Resolver, Int} from "type-graphql";
import { Family, FamilyInputType } from "../entity/Family";

@Resolver()
export class FamilyResolver {
  @Query(() => [Family])
  async families() {
    return await Family.find({
      relations: ['guests'],
      loadRelationIds: false
    });
  }


  @Mutation(() => Boolean)
  async newFamily(
    @Arg('name') name: string
  ) {
    try {
      await Family.insert({ name })
      return true;
    } catch(err) {
      console.error(err);
      return false
    }
  }

  @Mutation(() => Boolean)
  async updateFamily(
    @Arg('familyId', () => Int) familyId: number,
    @Arg('family') family: FamilyInputType
  ){
    try {
      Family.update(familyId, family);
      return true;
    } catch (err) {
      console.error(err);
      return false
    }
  }

  @Mutation(() => Boolean)
  async deleteFamily (@Arg('familyId', () => Int) familyId: number) {
    try {
      Family.delete(familyId);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
